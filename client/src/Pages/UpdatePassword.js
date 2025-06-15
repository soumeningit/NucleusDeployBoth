import React from 'react'
import { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../service/authAPI';
import toast from 'react-hot-toast';

function UpdatePassword() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [typePassword, settypePassword] = useState(false);
    const [typeConfirmPassword, setTypeConfirmPassword] = useState(false);


    const token = location.pathname.split("/").pop();

    console.log("Token : ", token)

    async function submitBtnHandler(e) {
        e.preventDefault();
        // const { token } = useParams();
        console.log("inside update password page ", "password : ", password, "confirmPassword : ", confirmPassword, " token : ", token);
        const toastId = toast.loading("Loading....");
        try {
            const response = await resetPassword(password, confirmPassword, token, navigate);
            if (response.status === 200) {
                toast.success("Password reset successfully");
                toast.dismiss(toastId);
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Failed! Please try after some time.")
            console.error("Error resetting password:", error);
        } finally {
            toast.dismiss(toastId);
        }
    }

    return (

        <div className="flex items-center justify-center min-h-screen bg-[rgba(31,41,55,255)] p-4">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 lg:p-10 rounded-lg shadow-lg backdrop-blur-md bg-opacity-30 max-w-md w-full relative">
                <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
                    Update Password
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                    Almost there, fill the password
                </p>
                <form onSubmit={submitBtnHandler} className="space-y-4">
                    <div className="relative">
                        <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 mb-2">
                            New Password
                        </label>
                        <input
                            type={typePassword ? "text" : "password"}
                            required
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                        />
                        <span onClick={() => settypePassword(!typePassword)} className="absolute right-3 top-12 cursor-pointer">
                            {typePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>

                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-200 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type={typeConfirmPassword ? "text" : "password"}
                            required
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                        />
                        <span onClick={() => setTypeConfirmPassword(!typeConfirmPassword)} className="absolute right-3 top-12 cursor-pointer">
                            {typeConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>

    )
}

export default UpdatePassword