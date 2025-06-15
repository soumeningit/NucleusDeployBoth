import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../service/authAPI';
import Dashboard from '../Pages/Dashboard';
import { setToken } from '../Slices/authSlice';
import { setUser } from '../Slices/profileSlice';

function ProfileDropdown() {
    const { user } = useSelector((state) => state.profile);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tokenObj = useSelector((state) => state.auth);
    const token = tokenObj?.token;

    const handleLogout = (event) => {
        event.preventDefault();
        if (token) {
            try {
                logout(token, navigate, setToken, setUser, dispatch);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const dashboardHandle = () => {
        navigate('/dashboard');
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!tokenObj || !user) {
        return null;
    }

    const img = user?.image;

    return (
        <div className="relative" ref={dropdownRef}>
            <img
                src={img}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={toggleDropdown}
            />
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 translate-x-[90%] bg-white rounded-md shadow-lg py-2 z-50">
                    <Link to={`/dashboard/my-profile/${user?._id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        {/* <button onClick={dashboardHandle}>
                            <span className="font-semibold block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</span>
                        </button> */}
                        Dashboard
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
