import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import image from "../../assets/signin.png";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { logInAPI } from "../../operation/service/authService";
import AuthContext from "../../context/AuthContext";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const authContext = useContext(AuthContext);
  const { addData } = authContext;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);

    const toastId = toast.loading("Signing In...");
    try {
      const response = await logInAPI(formData.email, formData.password);
      console.log(response);
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Sign-in successful!", { id: toastId });
        const token = response.data.token;
        const user = response.data.user;
        addData(token, user);
        if (user?.accountType === "Admin") {
          navigate("/admin/dashboard");
          return;
        } else {
          navigate("/dashboard/profile");
        }
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
      toast.error("Sign-in failed.", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  function handleSignInWithGoogle(e) {
    e.preventDefault();

    const backendUrl = import.meta.env.VITE_PROD_BACKEND_URL;

    // Redirect user to backend OAuth endpoint
    window.location.href = `${backendUrl}/auth/signin/google`;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Image Section (Visible on larger screens) */}
      <div
        className="hidden lg:block relative w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-800 to-transparent opacity-75"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <h2 className="text-white text-4xl font-extrabold leading-tight">
            Welcome Back to <br /> Your Learning Hub
          </h2>
          <p className="mt-4 text-white text-opacity-80 text-lg">
            Sign in to access your courses, track your progress, and continue
            your journey.
          </p>
        </div>
      </div>

      {/* Sign-In Form Section */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to <span className="text-blue-600">Nucleus</span>
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
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
                      className="cursor-pointer absolute inset-y-0 right-0 px-3 flex items-center"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FaEye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign In
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Logins */}
                <div className="mt-6"></div>
                <button
                  type="button"
                  onClick={handleSignInWithGoogle}
                  className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span className="ml-2">Sign in with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
