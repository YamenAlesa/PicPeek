import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { followUser, unfollowUser } from "../requests/axios.requests";
import { useSelector, useDispatch } from "react-redux";
import { followUserRedux, unfollowUserRedux } from "../reducers/userReducer";

const UserDetailPage = () => {
  const { username } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [targetUser, setTargetUser] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const isFollowing = user && targetUser ? user.following.includes(targetUser.id) : false;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const response = await axios.get(
          `http://localhost:4499/api/users/search/${username}`,
          config
        );

        setTargetUser(response.data[0]);
      } catch (err) {
        setError("Failed to load user details.");
      }
    };

    fetchUser();
  }, [username]);

  const handleFollowUser = async () => {
    if (!targetUser) return;

    try {
      if (isFollowing) {
        await unfollowUser(targetUser.id);
        dispatch(unfollowUserRedux(targetUser.id));

        setTargetUser((prev) => ({
          ...prev,
          followers: prev.followers - 1,
        }));
      } else {
        await followUser(targetUser.id);
        dispatch(followUserRedux(targetUser.id));

        setTargetUser((prev) => ({
          ...prev,
          followers: prev.followers + 1,
        }));
      }
    } catch (err) {
      console.error("Error updating follow status:", err);
    }
  };

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!targetUser) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={targetUser.profilePicture}
          alt={`${targetUser.name}'s profile`}
          className="w-24 h-24 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-semibold">{targetUser.name}</h2>
          <p className="text-gray-600">@{targetUser.username}</p>
          <p>{targetUser.bio}</p>
        </div>
      </div>
      <div className="mt-4">
        <p>Posts: {targetUser.postCount}</p>
        <p>Followers: {targetUser.followers}</p>
        <p>Following: {targetUser.following}</p>
      </div>

      {/* Follow/Unfollow Button */}
      <button
        onClick={handleFollowUser}
        className={`px-4 py-2 mt-4 text-white rounded-md ${
          isFollowing ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>

      {/* Message Button */}
      <button
        onClick={() => navigate(`/chat?userId=${targetUser.id}`)} // Navigate to chat page
        className="px-4 py-2 mt-4 ml-2 text-white bg-green-500 rounded-md"
      >
        Message
      </button>
    </div>
  );
};

export default UserDetailPage;
