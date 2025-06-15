import React, { useState } from "react";
import SignInImage from "../assets/LogIn_New.png";
import "./Registration.css";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { logIn } from "../service/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../Slices/authSlice";
import { setUser } from "../Slices/profileSlice";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    logIn(
      formData.email,
      formData.password,
      navigate,
      setToken,
      setUser,
      dispatch
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-[#5d646452] min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center rounded-md m-4">
        <img
          src={SignInImage}
          alt="Sign In"
          loading="lazy"
          className="object-cover rounded-md border-gray-100 h-4/6 w-5/6 mt-6"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center rounded-md m-4 p-6 space-y-6">
        <h1 className="text-2xl font-bold italic text-blue-500">
          Welcome Back to Nucleus!
        </h1>
        <p className="text-lg font-semibold text-gray-700 max-w-md">
          Log in to access your account and continue exploring all the platform
          has to offer.
        </p>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-4/5">
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="flex flex-row space-x-1">
              Email{" "}
              <sup className="text-xl font-bold text-[#ee5757ee] mt-2 ml-[0.15rem]">
                *
              </sup>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border-1 border-richblack-100 outline-none rounded-md focus:border focus:border-blue-400 bg-richblack-400 text-richblue-5 focus:shadow-md"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col space-y-1 relative">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-600"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-2 border-1 border-richblack-100 outline-none rounded-md focus:border focus:border-blue-400 bg-richblack-400 text-richblue-5 focus:shadow-md"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform cursor-pointer mt-[2rem]"
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
