import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 h-screen text-white">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <nav className="mt-10">
                <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Dashboard
                </Link>
                <Link to="/courses" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Courses
                </Link>
                <Link to="/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Users
                </Link>
                <Link to="/analytics" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Analytics
                </Link>
                <Link to="/announcements" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Announcements
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
