import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { followUser, unfollowUser } from "../requests/axios.requests";
import { useSelector } from "react-redux";

const UserDetailPage = () => {
  const { username } = useParams();
  const [targetUser, setTagetUser] = useState(null);
  console.log("target", targetUser);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.user);
  console.log("user", user);
  const isFollowingUser = user.following.includes(targetUser?.id);
  console.log("isFollowingUser", isFollowingUser);
  const [isFollowing, setIsFollowing] = useState(isFollowingUser);

  const handleFollowUser = async () => {
    if (!isFollowing) {
      setIsFollowing(true);
      await followUser(targetUser);
    } else {
      setIsFollowing(false);
      // await unfollowUser(targetUser);
      console.log("unfollow", targetUser);
    }
  };

  useEffect(() => {
    setIsFollowing(isFollowingUser);
  }, [isFollowingUser]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          `http://localhost:4499/api/users/search/${username}`,
          config
        );
        setTagetUser(response.data[0]);
      } catch (err) {
        setError("Failed to load user details.");
      }
    };

    fetchUser();
  }, [username]);

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
      <button onClick={handleFollowUser} className="bg-gray-600 text-white">
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserDetailPage;
