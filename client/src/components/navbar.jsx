import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import picpeeklogoWhite from "../imgs/PicPeekLogoWhite2.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(logout());
    toggleMenu();
  };

  return (
    <nav className="bg-blue-600 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center">
          <img className="w-40 h-auto" src={picpeeklogoWhite} alt="PicPeek Logo" />
        </div>

        {user && (
          <div className="hidden md:flex space-x-6">
            <Link to="/home" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/search" className="text-white hover:text-gray-300">
              Explore
            </Link>
            <Link to="#" className="text-white hover:text-gray-300">
              Notifications
            </Link>
            <Link to="#" className="text-white hover:text-gray-300">
              Messages
            </Link>
          </div>
        )}

        <div className="relative">
          {user && (
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
          )}

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40">
              <ul className="py-2 text-gray-700">
                <li>
                  <Link
                    onClick={toggleMenu}
                    to="/user/profile"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Profile
                  </Link>
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
