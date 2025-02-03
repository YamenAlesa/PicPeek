import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const FriendsChatList = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [friends, setFriends] = useState([]);
  console.log("friends", friends);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user) return;

      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const response = await axios.get("http://localhost:4499/api/users/friends", config);
        setFriends(response.data);
      } catch (err) {
        console.error("Failed to fetch friends:", err);
      }
    };

    fetchFriends();
  }, [user]);

  if (!user) return <p className="text-center mt-4">Please log in to see your friends.</p>;

  console.log("Friends", friends);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Friends Chat List</h2>
      {friends && friends.length === 0 ? (
        <p>No friends yet. Follow users and have them follow you back!</p>
      ) : (
        <ul className="space-y-3">
          {friends.map((friend) => (
            <li
              key={friend._id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              onClick={() => navigate(`/chat?userId=${friend._id}`)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.profilePicture || "/default-profile.png"}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <span className="font-medium">{friend.name}</span>
              </div>
              <button className="px-3 py-1 text-white bg-green-500 rounded-md">Chat</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsChatList;
