import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { resetPasswordToken } from '../service/authAPI';
import toast from 'react-hot-toast';

function ForgotPassword() {

    const dispatch = useDispatch();

    let [email, setEmail] = useState('');
    const [isemailSent, setisemailSent] = useState(false);

    const { loader } = useSelector((state) => state.auth);

    async function handleOnSubmit(event) {
        event.preventDefault();
        const toastId = toast.loading("Loading....");
        try {
            const response = await resetPasswordToken(email, setisemailSent);
            console.log("response : " + response);
            console.log("response : " + JSON.stringify(response));
            if (response.status === 200) {
                toast.success("Password reset link sent successfully");
                toast.dismiss(toastId);
            }
        } catch (error) {
            console.log("e " + error)
            // toast.error(error.respose.data.message);
            toast.dismiss(toastId);
            console.error(error);
        } finally {
            toast.dismiss(toastId);
        }
    }

    console.log("In Forgot Password Page : ", email);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#5d646452]">
            <div className="relative bg-white bg-opacity-10 backdrop-blur-md border border-gray-300/30 rounded-lg shadow-lg p-6 md:p-8 lg:p-12 max-w-md w-full">
                {/* Gradient Overlay for Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff30] via-[#ffffff10] to-[#00000010] rounded-lg pointer-events-none"></div>

                <h1 className="text-2xl font-semibold mb-4 text-center text-richblue-400">
                    {!isemailSent ? "Trouble logging in?" : "Check Your Registered Mail"}
                </h1>
                <p className="text-center text-richblack-800 mb-6">
                    {!isemailSent
                        ? "Enter your email and we'll send you a link to get back into your account."
                        : `We sent you a link to your mail ${email}`}
                </p>
                <form onSubmit={handleOnSubmit} className="space-y-4 relative z-10">
                    {!isemailSent && (
                        <div>
                            <label htmlFor="email" className="block text-richblue-600 mb-2">
                                Enter your registered email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Mail"
                                className="w-full px-4 py-2 border border-[#cccccc] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-richblack-400 text-[#e4e4e4] dark:border-[#3a3a3a]"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white bg-[#2563eb] rounded-md hover:bg-[#1e4fb7] focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:bg-[#1d4ed8] dark:hover:bg-[#153c8a]"
                    >
                        {!isemailSent ? "Send me a link" : "Resend Mail"}
                    </button>
                </form>
                <div className="mt-6 text-center relative z-10">
                    <Link
                        to="/login"
                        className="text-[#002e93dd] hover:underline dark:text-[#60a5fa] flex items-center justify-center"
                    >
                        <IoIosArrowRoundBack className="mx-2" /> Back to log in
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default ForgotPassword