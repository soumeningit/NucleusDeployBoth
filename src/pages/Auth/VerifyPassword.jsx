import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import toast from "react-hot-toast";
import { resetPasswordAPI } from "../../operation/service/authService";

const VerifyPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    const toastId = toast.loading("Updating...");
    try {
      const response = await resetPasswordAPI(
        formData.password,
        formData.confirmPassword,
        token
      );
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Password reset successful!", { id: toastId });
        setIsSuccess(true);
        // Optionally, navigate to login after a delay
        setTimeout(() => {
          navigate("/sign-in");
        }, 6000);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
      toast.error("Password reset failed.", { id: toastId });
      setErrors(newErrors);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {isSuccess ? (
            <div>
              <HiOutlineCheckCircle className="w-16 h-16 mx-auto text-green-500" />
              <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
                Password Reset!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Your password has been successfully updated. You can now sign in
                with your new password.
              </p>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Go to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Create a New Password
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Your new password must be at least 8 characters long.
              </p>
              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* New Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    New Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`appearance-none block w-full pr-10 pl-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center"
                    >
                      {showPassword ? (
                        <HiOutlineEyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <HiOutlineEye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 text-left">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Confirm New Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`appearance-none block w-full pr-10 pl-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 px-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <HiOutlineEyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <HiOutlineEye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 text-left">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;
