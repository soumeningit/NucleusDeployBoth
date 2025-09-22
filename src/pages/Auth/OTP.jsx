import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiShieldCheck } from "react-icons/hi2"; // <-- Import from react-icons
import OtpContext from "../../context/OTPContext";
import toast from "react-hot-toast";
import { signUpAPI } from "../../operation/service/authService";

const Otp = () => {
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state?.email || "your.email@example.com";

  const context = useContext(OtpContext);
  const { otpData } = context;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResendOtp = () => {
    console.log("Resending OTP...");
    setSuccess("A new OTP has been sent to your email.");
    setError("");
    setTimer(60);
  };

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < OTP_LENGTH) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    inputRefs.current[pastedData.length - 1]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length < OTP_LENGTH) {
      setError("Please enter the complete OTP.");
      return;
    }

    const toastId = toast.loading("Verifying OTP...");

    try {
      const data = {
        ...otpData,
        otp: enteredOtp,
      };
      console.log("submitting data:", data);
      const response = await signUpAPI(data);
      console.log("OTP Verification Response:", response);
      console.log("OTP Verification Response:", JSON.stringify(response));
      if (response.status === 201) {
        toast.dismiss(toastId);
        toast.success("OTP Verified Successfully", { id: toastId });
        navigate("/sign-in");
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
      toast.error("OTP Verification Failed", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <HiShieldCheck className="w-16 h-16 mx-auto text-blue-600" />{" "}
          {/* <-- Use react-icon */}
          <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
            Verify Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit verification code to <br />
            <span className="font-medium text-gray-800">{userEmail}</span>
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div
              className="flex justify-center gap-2 sm:gap-4"
              onPaste={handlePaste}
            >
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  name="otp"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold border rounded-md shadow-sm transition-all focus:outline-none focus:ring-blue-500
                    ${
                      error
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }
                  `}
                />
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600 text-center">{success}</p>
            )}

            <div>
              <button
                type="submit"
                className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify Account
              </button>
            </div>

            <div className="text-sm text-center">
              {timer > 0 ? (
                <p className="text-gray-500">Resend code in {timer}s</p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="cursor-pointer font-medium text-blue-600 hover:text-blue-500"
                >
                  Didn't receive the code? Resend
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
