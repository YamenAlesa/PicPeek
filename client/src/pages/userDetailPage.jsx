import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetailPage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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
        setUser(response.data[0]); // Assuming the search route returns an array
      } catch (err) {
        setError("Failed to load user details.");
      }
    };

    fetchUser();
  }, [username]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  if (!user) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.profilePicture}
          alt={`${user.name}'s profile`}
          className="w-24 h-24 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-gray-600">@{user.username}</p>
          <p>{user.bio}</p>
        </div>
      </div>
      <div className="mt-4">
        <p>Posts: {user.posts}</p>
        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>
      </div>
    </div>
  );
};

export default UserDetailPage;
