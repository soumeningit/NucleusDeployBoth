import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiBookOpen,
  FiTag,
  FiDollarSign,
  FiShield,
  FiSettings,
  FiChevronsLeft,
  FiChevronsRight,
  FiBell,
} from "react-icons/fi";
import { FaAtom } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

import useAuthContext from "../../../customhooks/useAuthContext";

const SidebarLink = ({ to, icon, text, isOpen }) => (
  <NavLink
    to={to}
    end // Use 'end' for the dashboard link to not stay active on other routes
    className={({ isActive }) => `
      flex items-center p-3 my-1.5 rounded-lg text-slate-300
      transition-colors duration-200 cursor-pointer
      hover:bg-slate-700 hover:text-white
      ${isActive ? "bg-indigo-600 text-white shadow-lg" : ""}
    `}
  >
    {icon}
    <span
      className={`
      ml-4 whitespace-nowrap transition-all duration-200 
      ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 pointer-events-none"}
    `}
    >
      {text}
    </span>
  </NavLink>
);

function AdminSidebar({ isOpen, setIsOpen }) {
  const adminNavItems = [
    { to: "/", icon: <IoMdHome size={22} />, text: "Home" },
    { to: "/admin/dashboard", icon: <FiGrid size={22} />, text: "Dashboard" },
    {
      to: "/admin/courses",
      icon: <FiBookOpen size={22} />,
      text: "Course Management",
    },
    {
      to: "/admin/users",
      icon: <FiUsers size={22} />,
      text: "User Management",
    },
    { to: "/admin/categories", icon: <FiTag size={22} />, text: "Categories" },
    {
      to: "/admin/financials",
      icon: <FiDollarSign size={22} />,
      text: "Financials",
    },
    // {
    //   to: "/admin/moderation",
    //   icon: <FiShield size={22} />,
    //   text: "Moderation",
    // },
    {
      to: "/admin/notifications",
      icon: <FiBell size={22} />,
      text: "Notifications",
    },
    {
      to: "/admin/settings",
      icon: <FiSettings size={22} />,
      text: "Site Settings",
    },
  ];

  const [token, user, , logout] = useAuthContext();

  function handleLogout() {
    if (token) {
      logout();
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-30 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`
          fixed top-0 left-0 min-h-screen bg-slate-900 text-white z-40 overflow-hidden
          flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"}
          lg:translate-x-0 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo and Desktop Toggle */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-slate-700 flex-shrink-0">
          <div
            className={`flex items-center overflow-hidden transition-all duration-300 ${
              isOpen ? "w-auto" : "w-0"
            }`}
          >
            <FaAtom size={30} className="text-indigo-400 flex-shrink-0" />
            <h1 className="ml-3 text-2xl font-bold">Nucleus</h1>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-slate-700 cursor-pointer"
          >
            {isOpen ? (
              <FiChevronsLeft size={24} />
            ) : (
              <FiChevronsRight size={24} />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          {adminNavItems.map((item) => (
            <SidebarLink key={item.to} {...item} isOpen={isOpen} />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-4 pb-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors duration-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 15l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <span className={isOpen ? "block" : "hidden"}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
