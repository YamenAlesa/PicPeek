import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../reducers/userReducer";

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
      setProfilePicture(user.profilePicture);
    }
  }, [user]);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => setEditing(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);
      try {
        const response = await axios.post("http://localhost:4499/api/cloudinary/upload", formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        });
        console.log("RESPONSE", response.data);
        setProfilePicture(response.data.user.profilePicture);
        dispatch(login(response.data.user));
      } catch (error) {
        console.error("Error uploading profile picture", error);
      }
    }
  };

  const handleSave = async () => {
    if (!user?.id) {
      console.error("User ID is undefined. Cannot update profile.");
      return;
    }

    try {
      const response = await axios.put(`/api/users/${user.id}`, { name, bio });
      dispatch({ type: "UPDATE_USER", payload: response.data });
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  if (!user) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="relative flex justify-center md:justify-end">
        <img
          src={profilePicture}
          alt={`${user.name}'s profile`}
          className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg transform transition-transform hover:scale-105"
        />
        <label className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full cursor-pointer text-white hover:bg-gray-600 transition-colors">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span className="text-xl">📷</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* User Info Section */}

        <div className="col-span-2">
          <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600 text-lg">@{user.username}</p>
          <p className="text-gray-700 mt-2">{user.bio}</p>
          <button
            className="mt-6 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col md:flex-row gap-6 text-center md:text-left text-sm md:text-base">
          <p>
            <span className="font-semibold text-lg">{user.postCount}</span> posts
          </p>
          <p>
            <span className="font-semibold text-lg">{user.followers.length}</span> followers
          </p>
          <p>
            <span className="font-semibold text-lg">{user.following.length}</span> following
          </p>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg transform transition-all">
            <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-md mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Bio"
            ></textarea>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
