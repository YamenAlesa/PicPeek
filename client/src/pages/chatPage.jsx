import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Get userId from URL
import { useSelector } from "react-redux"; // Use Redux store
import socket from "../utils/socket";
import API from "../utils/api";

const Chat = () => {
  const user = useSelector((state) => state.user.user); // Get current user
  const [searchParams] = useSearchParams();
  const receiver = searchParams.get("userId"); // Get userId from URL
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user) return; // Prevent running if no user

    socket.connect();
    socket.emit("join", user._id);

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [user]);

  const sendMessage = async () => {
    const newMessage = { sender: user._id, receiver, message };

    // Emit the message to the server
    socket.emit("sendMessage", newMessage);

    // Update the local state to display the sent message immediately
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Send the message to the server (to store it in the database)
    await API.post("/chat/send", newMessage);

    // Clear the input field
    setMessage("");
  };

  // Helper function to format the time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  if (!user) return <p className="text-center mt-4">Please log in to use chat.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Chat</h2>
      {receiver ? <p>Chatting with User ID: {receiver}</p> : <p>Select a user to chat with.</p>}
      <div className="h-60 overflow-y-auto border p-2 mt-2 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === user._id ? "justify-end" : "justify-start"}`}
          >
            {/* Display sender name above the message */}
            <div className="flex flex-col items-start">
              {msg.sender !== user._id && (
                <span className="text-sm text-gray-500">{msg.senderName}</span>
              )}
              <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">{msg.message}</div>
              {/* Display the timestamp below the message */}
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
