import React, { useState } from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  if (!user) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="flex justify-center md:justify-end">
          <img
            src={user.profilePicture}
            alt={`${user.name}'s profile`}
            className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border border-gray-300"
          />
        </div>

        <div className="col-span-2">
          <div className="flex items-center gap-4">
            <div className="mt-4">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="font-semibold">{user.username}</p>
              <p className="text-gray-600">{user.bio}</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border rounded-md hover:bg-gray-200">
              Edit Profile
            </button>
          </div>
          <div className="flex gap-6 mt-4 text-sm md:text-base">
            <p>
              <span className="font-semibold">{user.postCount}</span> posts
            </p>
            <p>
              <span className="font-semibold">{user.followers.length}</span> followers
            </p>
            <p>
              <span className="font-semibold">{user.following.length}</span> following
            </p>
          </div>
        </div>
      </div>

      <div className="  mt-8">
        <h3 className="flex justify-center text-lg font-semibold mb-4">Posts</h3>
        <div className="bg-gray-100 rounded-md h-96"></div>
      </div>
    </div>
  );
};

export default UserProfile;
