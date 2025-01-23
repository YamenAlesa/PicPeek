import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import picpeeklogoWhite from "../imgs/PicPeekLogoWhite2.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get("http://localhost:4499/api/users/profile", config);
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center">
          <img className="w-40 h-auto" src={picpeeklogoWhite} alt="PicPeek Logo" />
        </div>

        <div className="hidden md:flex space-x-6">
          <a href="/home" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/search" className="text-white hover:text-gray-300">
            Explore
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Notifications
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Messages
          </a>
        </div>

        <div className="relative">
          {user ? (
            <button
              onClick={toggleMenu}
              className="w-10 h-10 hover:scale-125 rounded-full overflow-hidden border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <img
                src={user.profilePicture || "https://via.placeholder.com/150"}
                alt="User Profile"
                className=" w-full h-full object-cover"
              />
            </button>
          ) : (
            <button className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center">
              <i className="fas fa-user"></i>
            </button>
          )}

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40">
              <ul className="py-2 text-gray-700">
                <li>
                  <a
                    href="/user/profile"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden flex items-center justify-between">
        <button className="text-white">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
