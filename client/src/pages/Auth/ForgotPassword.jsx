import { useState } from "react";
import { Link } from "react-router-dom";
import { MdMailOutline } from "react-icons/md";
import { HiOutlineArrowLeft } from "react-icons/hi";
import toast from "react-hot-toast";
import { resetPasswordToken } from "../../operation/service/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email address is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const toastId = toast.loading("Sending reset link...");
    try {
      const response = await resetPasswordToken(email);
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Reset link sent successfully!", { id: toastId });
        setIsSubmitted(true);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
      toast.error("Failed to send reset link.", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {isSubmitted ? (
            <div>
              <MdMailOutline className="w-16 h-16 mx-auto text-blue-600" />
              <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
                Check your email
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                If an account with the email{" "}
                <span className="font-medium text-gray-800">{email}</span>{" "}
                exists, we have sent a password reset link.
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Forgot your password?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                No problem. Enter your email address below and we'll send you a
                link to reset it.
              </p>

              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email address"
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  <Link
                    to="/sign-in"
                    className="font-medium text-blue-600 hover:text-blue-500 flex items-center"
                  >
                    <HiOutlineArrowLeft className="w-5 h-5 mr-2" />
                    Back to Sign In
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
