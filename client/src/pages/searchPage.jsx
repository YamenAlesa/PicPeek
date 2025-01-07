import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(
        `http://localhost:4499/api/users/search/${query}`,
        config
      );

      setResults(response.data);
      setError(null);
    } catch (err) {
      setResults([]);
      setError("No users found. Please try a different query.");
    }
  };

  const goToProfile = (username) => {
    navigate(`/user/profile/${username}`);
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-lg font-bold mb-4 text-center">Search for Users</h1>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter name or username"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-4">
        {results.map((user) => (
          <div
            key={user.username}
            className="p-4 border rounded mb-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
            onClick={() => goToProfile(user.username)}
          >
            <div className="flex items-center gap-4">
              <img
                src={user.profilePicture}
                alt={`${user.name}'s profile`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
