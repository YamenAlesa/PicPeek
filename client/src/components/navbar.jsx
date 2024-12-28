import React from "react";
import picpeeklogo from "../imgs/PicPeekLogo.png";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="w-24 text-white h-auto" // Resize the logo
            src={picpeeklogo}
            alt="PicPeek Logo"
          />
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          <a href="/home" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Explore
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Notifications
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Messages
          </a>
        </div>

        {/* User Avatar and Menu */}
        <div className="flex items-center space-x-4">
          <button className="bg-white p-2 rounded-full text-blue-600 hover:bg-gray-200">
            <i className="fas fa-bell"></i>
          </button>
          <button className="bg-white p-2 rounded-full text-blue-600 hover:bg-gray-200">
            <i className="fas fa-comment-alt"></i>
          </button>

          {/* Profile icon */}
          <div className="relative">
            <button className="w-10 h-10 rounded-full bg-gray-300 text-white">
              <i className="fas fa-user"></i>
            </button>
            <div className="absolute right-0 top-12 bg-white shadow-md rounded-md p-2 w-40">
              <ul className="space-y-2 text-gray-700">
                <li>
                  <a href="/user/profile" className="hover:text-blue-600">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/auth/login" className="hover:text-blue-600">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hamburger) */}
      <div className="md:hidden flex items-center justify-between">
        <button className="text-white">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
