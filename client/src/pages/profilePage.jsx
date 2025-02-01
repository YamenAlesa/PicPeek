import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../reducers/userReducer";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { TbPhotoEdit } from "react-icons/tb";

let debounceTimeout;

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [bioError, setBioError] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setBio(user.bio);
      setProfilePicture(user.profilePicture);
    }
  }, [user]);

  const validateUsername = (input) => /^[a-z0-9._-]+$/.test(input);

  const checkUsernameAvailability = async (input) => {
    try {
      setCheckingUsername(true);
      const response = await axios.get(`http://localhost:4499/api/users/check-username/${input}`);

      if (response.data.exists) {
        setUsernameError("Username already exists. Please choose another.");
        setUsernameAvailable(false);
      } else {
        setUsernameError("");
        setUsernameAvailable(true);
      }
    } catch (error) {
      console.error("Error checking username availability:", error);
      setUsernameError("Error checking availability. Try again later.");
      setUsernameAvailable(false);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleUsernameChange = (event) => {
    const input = event.target.value;
    setUsername(input);

    if (input.length < 5) {
      setUsernameError("Username must be at least 5 characters long.");
      setUsernameAvailable(false);
      return;
    }

    if (input.length > 30) {
      setUsernameError("Username must be less than 30 characters.");
      setUsernameAvailable(false);
      return;
    }

    if (!validateUsername(input)) {
      setUsernameError("Username can only contain lowercase letters, numbers, and symbols (.-_)");
      setUsernameAvailable(false);
      return;
    }

    setUsernameError("");
    setUsernameAvailable(true);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => checkUsernameAvailability(input), 1000);
  };

  const handleNameChange = (event) => {
    const input = event.target.value;
    setName(input);

    if (input.length < 1) {
      setNameError("Name must be at least 1 character long.");
    } else if (input.length > 30) {
      setNameError("Name must be less than 30 characters.");
    } else {
      setNameError("");
    }
  };

  const handleBioChange = (event) => {
    const input = event.target.value;
    setBio(input);

    if (input.length > 150) {
      setBioError("Bio must be less than 150 characters.");
    } else {
      setBioError("");
    }
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setUsernameError("");
    setNameError("");
    setBioError("");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);
      try {
        const response = await axios.post("http://localhost:4499/api/cloudinary/upload", formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        });
        setProfilePicture(response.data.user.profilePicture);
        dispatch(login(response.data.user));
      } catch (error) {
        console.error("Error uploading profile picture", error);
      }
    }
  };

  const handleSave = async () => {
    if (!user || usernameError || nameError || bioError || !usernameAvailable) return;

    try {
      const response = await axios.patch(
        `http://localhost:4499/api/users`,
        { name, username, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(login(response.data));
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  if (!user) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
      {/* Profile Picture */}
      <div className="relative flex justify-center mb-6">
        <img
          src={profilePicture}
          alt={`${user.name}'s profile`}
          className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <label className="relative max-h-9 -bottom-36 right-12 bg-gray-800 p-2 rounded-full cursor-pointer text-white hover:bg-gray-600 transition-colors">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span className="text-xl">
            <TbPhotoEdit />
          </span>
        </label>
      </div>

      {/* Name & Username */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold">{user.name}</h2>
        <p className="text-gray-600 text-lg">@{user.username}</p>
        <p className="text-gray-700 mt-2">{user.bio}</p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-12 mb-6 text-lg font-semibold">
        <div className="text-center">
          <p className="text-xl">{user.postCount}</p>
          <p>Posts</p>
        </div>
        <div className="text-center">
          <p className="text-xl">{user.followers.length}</p>
          <p>Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl">{user.following.length}</p>
          <p>Following</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center">
        <button
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleEdit}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

            {/* Name */}
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full border p-3 rounded-md mb-2 shadow-sm"
              placeholder="Name"
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

            {/* Username */}
            <p>Username</p>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full border p-3 rounded-md shadow-sm pr-10"
                placeholder="Username"
              />
              <span className="absolute right-3 top-3 text-lg">
                {checkingUsername ? (
                  <span className="text-blue-500">...</span>
                ) : usernameAvailable ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaCircleXmark className="text-red-500" />
                )}
              </span>
            </div>
            {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}

            {/* Bio */}
            <p>Bio</p>
            <textarea
              value={bio}
              onChange={handleBioChange}
              className="w-full border p-3 rounded-md shadow-sm"
              placeholder="Bio"
            ></textarea>
            {bioError && <p className="text-red-500 text-sm">{bioError}</p>}

            {/* Save/Cancel Buttons */}
            <div className="flex justify-between mt-6">
              <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded-md">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={
                  !usernameAvailable ||
                  username.length < 5 ||
                  username.length > 30 ||
                  !!usernameError ||
                  !!nameError ||
                  !!bioError
                }
                className={`px-4 py-2 rounded-md transition-colors ${
                  !usernameAvailable ||
                  username.length < 5 ||
                  username.length > 30 ||
                  !!usernameError ||
                  !!nameError ||
                  !!bioError
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
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
