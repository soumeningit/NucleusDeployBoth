import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardContext } from "../../context/DashboardContext";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { FaAtom, FaBookOpen, FaCartPlus } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { LuActivity } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import { DiGoogleAnalytics } from "react-icons/di";
import useAuthContext from "../../customhooks/useAuthContext";

const EnrolledCoursesIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const SidebarLink = ({ icon, text, to, isOpen, location }) => {
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        flex items-center p-3 my-1.5 rounded-lg text-slate-300
        transition-colors duration-200
        hover:bg-indigo-700 hover:text-white
        ${isActive ? "bg-indigo-600 text-white shadow-lg" : ""}
      `}
    >
      {icon}
      <span
        className={`
        ml-4 transition-all duration-200 
        ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 pointer-events-none"}
      `}
      >
        {text}
      </span>
    </Link>
  );
};

function Sidebar() {
  const { isSidebarOpen, setSidebarOpen } = useContext(DashboardContext);
  const location = useLocation();

  const [, user] = useAuthContext();

  const navItems = [
    { icon: <FiHome size={22} />, text: "Home", to: "/" },
    {
      icon: <LuActivity size={22} />,
      text: "Activity",
      to: "/dashboard/activity",
      role: "all",
    },
    {
      icon: <DiGoogleAnalytics size={22} />,
      text: "Analytics",
      to: "/dashboard/analytics",
      role: "instructor",
    },
    {
      icon: <FiUser size={22} />,
      text: "Profile",
      to: "/dashboard/profile",
      role: "all",
    },
    {
      icon: <EnrolledCoursesIcon size={22} />,
      text: "Enrolled Courses",
      to: "/dashboard/enrolled-courses",
      role: "all",
    },
    {
      icon: <FaBookOpen size={20} />,
      text: "Courses",
      to: "/dashboard/courses",
      role: "instructor",
    },
    // { icon: <FaCartPlus size={20} />, text: "Cart", to: "/dashboard/cart" },
    {
      icon: <MdAddTask size={22} />,
      text: "Create Course",
      to: "/dashboard/create-course",
      role: "instructor",
    },
    {
      icon: <FiSettings size={22} />,
      text: "Settings",
      to: "/dashboard/settings",
      role: "all",
    },
    {
      icon: <GiNotebook size={20} />,
      text: "Challenges",
      to: "/dashboard/challenges",
      role: "student",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-30 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`
          fixed top-0 left-0 h-screen bg-slate-800 text-white z-40
          flex flex-col
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64" : "w-20"}
          lg:translate-x-0 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo and Desktop Toggle */}
        <div
          className={`flex items-center h-20 px-4 transition-all duration-300 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          <div
            className={`flex items-center overflow-hidden transition-all duration-300 ${
              isSidebarOpen ? "w-auto" : "w-0"
            }`}
          >
            <FaAtom size={30} className="text-indigo-400 flex-shrink-0" />
            <h1 className="ml-3 text-2xl font-bold">Nucleus</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-slate-700 cursor-pointer"
          >
            {isSidebarOpen ? (
              <FiChevronsLeft size={24} />
            ) : (
              <FiChevronsRight size={24} />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6">
          {navItems
            .filter((item) => {
              // If no role specified or role is "all", show for everyone
              if (!item.role || item.role.toLowerCase() === "all") {
                return true;
              }
              // Compare user role with item role (both converted to lowercase)
              return (
                user?.accountType?.toLowerCase() === item.role.toLowerCase()
              );
            })
            .map((item) => (
              <SidebarLink
                key={item.text}
                {...item}
                isOpen={isSidebarOpen}
                location={location}
              />
            ))}
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-4 border-t border-slate-700">
          <SidebarLink
            icon={<FiLogOut size={22} />}
            text="Logout"
            to="/sign-in"
            isOpen={isSidebarOpen}
            location={location}
          />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
