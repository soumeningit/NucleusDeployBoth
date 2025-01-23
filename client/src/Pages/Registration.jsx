import React, { useState } from "react";
import RegistrationImage from "../assets/Registration_New.png";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import "./Registration.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignUpData } from "../Slices/authSlice";
import { sendOTP } from "../service/authAPI";

function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [userType, setUserType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState();
  const [colorIndicator, setColorIndicator] = useState();

  function handleChange(e) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (e.target.name === "password") {
      if (e.target.value.length < 4) {
        setError("Weak Password");
        setColorIndicator("#ff5233");
      } else if (e.target.value.length < 6) {
        setError("Medium Password");
        setColorIndicator("#FFA500");
      } else if (
        e.target.value.length > 6 &&
        e.target.value.match(passwordRegex)
      ) {
        setError("Strong Password");
        setColorIndicator("#03C03C");
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const signUpData = {
      ...formData,
      accountType: userType,
    };

    dispatch(setSignUpData(signUpData));
    dispatch(sendOTP(formData.email, navigate));
  };
  return (
    <div className="grid grid-cols-2 space-x-4 bg-[#5d646452] min-h-screen">
      {/* For left Portion */}
      <div className="flex flex-col justify-center items-center rounded-md h-full w-full m-2 p-4">
        <img
          src={RegistrationImage}
          alt="registrtion_image"
          loading="lazy"
          className="object-cover rounded-md border-gray-100 h-4/6 w-5/6 mt-12"
        />
      </div>
      {/* For right Portion */}
      <div className="flex flex-col rounded-md m-2 p-4 space-y-4">
        <div className="flex flex-col space-y-2 my-4">
          <p className="text-base text-blue-800 font-semibold font-edu-sa">
            Please Select Your Role
          </p>
          {/* Switch for Student and Instructor */}
          <div className="flex space-x-4">
            <button
              className={`${
                userType === "Student"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              } p-2 rounded-md`}
              onClick={() => setUserType("Student")}
            >
              Student
            </button>
            <button
              className={`${
                userType === "Instructor"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              } p-2 rounded-md`}
              onClick={() => setUserType("Instructor")}
            >
              Instructor
            </button>
          </div>
        </div>
        <h1 className="font-bold text-2xl italic text-blue-500">
          {userType === "Student"
            ? "Unlock Your Learning Potential with Nucleus"
            : "Empower the Next Generation with Nucleus"}
        </h1>
        <div className="max-w-[30rem]">
          <p className="w-full font-edu-sa font-semibold text-xl text-richblue-600">
            {userType === "Student"
              ? `Register now to access personalized educational resources and start
                  your journey towards success!`
              : `Join as an instructor and share your expertise with a global community of eager learners!`}
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-4/5"
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 space-x-2">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="flex flex-row space-x-1">
                  First Name{" "}
                  <sup className="text-xl font-bold text-[#ee5757ee] mt-2 ml-[0.15rem]">
                    *
                  </sup>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="p-2 border-1 border-richblack-100 outline-none rounded-md focus:border focus:border-blue-400 bg-richblack-400 text-richblue-5 focus:shadow-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="flex flex-row space-x-1">
                  Last Name{" "}
                  <sup className="text-xl font-bold text-[#ee5757ee] mt-2 ml-[0.15rem]">
                    *
                  </sup>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="p-2 border-1 border-richblack-100 outline-none rounded-md focus:border focus:border-blue-400 bg-richblack-400 text-richblue-5 focus:shadow-md"
                />
              </div>
            </div>
            {/* Email */}
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
            {/* Password */}
            <div className="relative flex flex-col">
              <label htmlFor="password" className="flex flex-row space-x-1">
                Password{" "}
                <sup className="text-xl font-bold text-[#ee5757ee] mt-2 ml-[0.15rem]">
                  *
                </sup>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 border-1 border-richblack-100 outline-none rounded-md focus:border focus:border-blue-400 bg-richblack-400 text-richblue-5 focus:shadow-md w-full pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer mt-[1.2rem]"
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
            {/* Password validation */}
            {error && (
              <p
                style={{ color: colorIndicator }}
                className="text-base font-bold"
              >
                {error}
              </p>
            )}
            {/* Confirm Password */}
            <div className="relative flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="flex flex-row space-x-1"
              >
                Confirm Password{" "}
                <sup className="text-xl font-bold text-[#ee5757ee] mt-2 ml-[0.15rem]">
                  *
                </sup>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.showConfirmPassword}
                onChange={handleChange}
                className="p-2 border-1 border-richblack-100 outline-none rounded-md focus:border focus:border-blue-400 bg-richblack-400 text-richblue-5 focus:shadow-md w-full pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer mt-[1.2rem]"
              >
                {showConfirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
            <div className="mt-6 w-full">
              <button
                type="submit"
                className="w-full mt-6 px-2 py-2 outline-none border-1 border-blue-5 bg-richblue-400 text-richblue-5 text-base font-bold rounded-md hover:bg-blue-500 hover:text-white hover:shadow-md transition-all duration-300 ease-in-out"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
