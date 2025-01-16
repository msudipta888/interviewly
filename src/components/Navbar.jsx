import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:3001/api/user/signout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      localStorage.removeItem("token");
  
      navigate("/auth/signin");
    } catch (error) {
  
      alert("An error occurred during logout. Please try again.");
    }
  };
  
  return (
    <div className="bg-blue-500 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="text-white font-bold text-xl cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            InterViewLy
          </div>

          <ul className="hidden md:flex flex-row text-white text-base items-center gap-x-8 lg:text-lg">
            <li
              className={`cursor-pointer hover:text-gray-200 ${
                isActive("/") ? "border-b-2 font-semibold" : ""
              }`}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </li>
            <li
              className={`cursor-pointer hover:text-gray-200 ${
                isActive("/interview") ? "border-b-2 font-semibold" : ""
              }`}
              onClick={() => navigate("/interviews")}
            >
              Interview
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </li>
            <li
              className={`cursor-pointer hover:text-gray-200 ${
                isActive("/interview") ? "border-b-2 font-semibold" : ""
              }`}
              onClick={() => navigate("/form")}
            >
              ShareExperience
            </li>
           
          </ul>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <ul className="md:hidden flex flex-col gap-y-4 text-white text-base items-center bg-blue-600 py-4 rounded-lg shadow-md">
            <li
              className={`cursor-pointer hover:text-gray-200 ${
                isActive("/dashboard") ? "border-b-2  font-semibold" : ""
              }`}
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              Dashboard
            </li>
            <li
              className={`cursor-pointer hover:text-gray-200 ${
                isActive("/interview") ? "border-b-2 font-semibold" : ""
              }`}
              onClick={() => {
                navigate("/interview");
                setMenuOpen(false);
              }}
            >
              Interview
            </li>
            <li
              className={`cursor-pointer hover:text-gray-200 ${
                isActive("/interview") ? "border-b-2 font-semibold" : ""
              }`}
              onClick={() => navigate("/form")}
            >
              ShareExperience
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
