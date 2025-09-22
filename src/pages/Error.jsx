import React from "react";
import { Link } from "react-router-dom";

// A simple SVG for a magnifying glass to add a little visual flair.
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-16 h-16 mx-auto text-gray-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Visual Element */}
        <div className="mb-4">
          <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-2">
          Page Not Found
        </h2>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8">
          Oops! It seems you've ventured into uncharted territory. The page
          you're looking for doesn't exist.
        </p>

        {/* Call to Action Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
