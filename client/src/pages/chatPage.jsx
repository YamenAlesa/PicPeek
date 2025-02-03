import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../utils/socket";
import API from "../utils/api";
import axios from "axios";

const Chat = () => {
  const user = useSelector((state) => state.user.user);
  const [searchParams] = useSearchParams();
  const receiver = searchParams.get("userId");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverProfile, setReceiverProfile] = useState(null);

  useEffect(() => {
    if (!user || !receiver) return;

    socket.connect();
    socket.emit("join", user._id);

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, { ...data, timestamp: data.timestamp || new Date() }]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [user, receiver]);

  useEffect(() => {
    const fetchReceiverProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const response = await axios.get(`http://localhost:4499/api/users/${receiver}`, config);

        console.log("Receiver Profile:", response.data); // Debugging

        // If profilePicture is missing, set a default one
        setReceiverProfile({
          ...response.data,
          profilePicture: response.data.profilePicture || "/default-profile.png",
        });
      } catch (err) {
        console.error("Failed to load receiver's profile:", err);
      }
    };

    if (receiver) {
      fetchReceiverProfile();
    }
  }, [receiver]);

  const sendMessage = async () => {
    const newMessage = { sender: user._id, receiver, message, timestamp: new Date() };

    socket.emit("sendMessage", newMessage);

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    await API.post("/chat/send", newMessage);

    setMessage("");
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!user) return <p className="text-center mt-4">Please log in to use chat.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Chat</h2>
      {receiver ? (
        <p>Chatting with {receiverProfile?.name || "User"}</p>
      ) : (
        <p>Select a user to chat with.</p>
      )}
      <div className="h-60 overflow-y-auto border p-2 mt-2 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === user._id ? "justify-end" : "justify-start"}`}
          >
            {msg.sender !== user._id && receiverProfile?.profilePicture && (
              <img
                src={
                  receiverProfile.profilePicture.startsWith("http")
                    ? receiverProfile.profilePicture
                    : `http://localhost:4499/${receiverProfile.profilePicture}`
                }
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover mr-2"
                onError={(e) => (e.target.src = "/default-profile.png")} // Fallback image
              />
            )}
            <div className="flex flex-col">
              {msg.sender !== user._id && (
                <span className="text-sm text-gray-500">{receiverProfile?.name}</span>
              )}
              <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">{msg.message}</div>
              <span className="text-xs text-gray-400">{formatTimestamp(msg.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
      <input
        className="border p-2 w-full mt-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="bg-blue-500 text-white p-2 w-full mt-2"
        onClick={sendMessage}
        disabled={!receiver}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
