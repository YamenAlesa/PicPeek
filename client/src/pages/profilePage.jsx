import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use `useNavigate` from React Router v6

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login page if no token is found
    } else {
      axios
        .get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.response?.data?.message || 'Error fetching data');
          setLoading(false);
        });
    }
  }, [token, navigate]); // Ensure navigate is added in the dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-page">
      <h2>{user.name}'s Profile</h2>
      <img
        src={user.profilePicture}
        alt="Profile"
        className="profile-picture"
        width="100"
        height="100"
      />
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Bio:</strong> {user.bio}
      </div>
      <div>
        <strong>Posts Count:</strong> {user.postCount}
      </div>
    </div>
  );
};

export default ProfilePage;
