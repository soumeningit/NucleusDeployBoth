import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiBookOpen, FiLogOut } from "react-icons/fi";

function ProfileDropdown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img
          src={
            user?.image ||
            `https://ui-avatars.com/api/?name=${user?.name}&background=random&size=128`
          }
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600 cursor-pointer"
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl z-20
          transition-all duration-200 ease-in-out origin-top-right
          ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="py-2">
          <div className="px-4 py-2 border-b border-gray-400">
            <p className="text-sm font-semibold text-slate-800">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
          <Link
            to="/dashboard/profile"
            onClick={handleLinkClick}
            className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
          >
            <FiUser className="mr-3" /> Profile
          </Link>
          <Link
            to="/dashboard/courses"
            onClick={handleLinkClick}
            className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
          >
            <FiBookOpen className="mr-3" /> My Courses
          </Link>
          <button
            onClick={onLogout}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-indigo-600 border-t border-gray-400 mt-2"
          >
            <FiLogOut className="mr-3" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;
