import { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ProfileDropdown from "../ProfileDropDown";
import logo from "../../assets/NucleusLogoNew.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const { token, user } = authContext.data;
  const logout = authContext.logOutContext;

  const navLinks = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Courses", link: "/courses" },
    { id: 3, name: "Contact", link: "/contact-us" },
    { id: 4, name: "About", link: "/about-us" },
    { id: 5, name: "Playground", link: "/playground" },
  ];

  const handleMobileNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu on navigation
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // Close menu on logout
    navigate("/");
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <img
            src={logo}
            alt="Nucleus Logo"
            className="h-10 w-10 inline mr-2"
          />
          <Link
            to="/"
            className="text-3xl font-bold text-gray-800 tracking-tighter"
          >
            Nucleus<span className="text-indigo-600">.</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.link}
              className={({ isActive }) =>
                `text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium ${
                  isActive ? "text-indigo-600" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/sign-in")}
                className="cursor-pointer font-medium text-gray-600 hover:text-indigo-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="cursor-pointer bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Sign Up
              </button>
            </>
          ) : (
            <ProfileDropdown user={user} onLogout={handleLogout} />
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6 text-gray-700" />
            ) : (
              <FaBars className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* --- Complete Mobile Menu --- */}
      <div
        className={`md:hidden bg-white shadow-xl transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen py-6" : "max-h-0 py-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.link}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 hover:text-indigo-600 text-lg"
            >
              {link.name}
            </NavLink>
          ))}

          <div className="w-full border-t my-4"></div>

          {!token ? (
            <>
              <button
                onClick={() => handleMobileNavClick("/sign-in")}
                className="text-gray-600 hover:text-indigo-600 text-lg"
              >
                Login
              </button>
              <button
                onClick={() => handleMobileNavClick("/signup")}
                className="w-3/4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-800">
                Welcome, {user?.name}!
              </p>
              <button
                onClick={() => handleMobileNavClick("/dashboard/profile")}
                className="w-3/4 py-2 font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Profile
              </button>
              <button
                onClick={() => handleMobileNavClick("/dashboard/my-courses")}
                className="w-3/4 py-2 font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                My Courses
              </button>
              <button
                onClick={handleLogout}
                className="w-3/4 bg-red-500 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
