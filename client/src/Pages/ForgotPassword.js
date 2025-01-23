import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { resetPassworedToken } from '../service/authAPI'

function ForgotPassword() {

    const dispatch = useDispatch();

    let [email, setEmail] = useState('');
    const [isemailSent, setisemailSent] = useState(false);

    const { loader } = useSelector((state) => state.auth);

    function handleOnSubmit(event) {
        event.preventDefault();
        dispatch(resetPassworedToken(email, setisemailSent));
    }

    console.log("In Forgot Password Page : ", email);

    // return (
    //     <div className="flex items-center justify-center min-h-screen bg-[#5d646452]">
    //         <div className="bg-white p-6 md:p-8 lg:p-12 rounded-lg shadow-lg backdrop-blur-md bg-opacity-30 max-w-md w-full">
    //             <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
    //                 {!isemailSent ? "Trouble logging in?" : "Check Your Registered Mail"}
    //             </h1>
    //             <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
    //                 {!isemailSent ? "Enter your email and we'll send you a link to get back into your account." : `We sent you a link to your mail ${email}`}
    //             </p>
    //             <form onSubmit={handleOnSubmit} className="space-y-4">
    //                 {!isemailSent && (
    //                     <div>
    //                         <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 mb-2">
    //                             Enter your registered email:
    //                         </label>
    //                         <input
    //                             type="email"
    //                             name="email"
    //                             id="email"
    //                             value={email}
    //                             onChange={(e) => setEmail(e.target.value)}
    //                             placeholder="Enter Mail"
    //                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
    //                         />
    //                     </div>
    //                 )}
    //                 <button
    //                     type="submit"
    //                     className="w-full py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
    //                 >
    //                     {!isemailSent ? "Send me a link" : "Resend Mail"}
    //                 </button>
    //             </form>
    //             <div className="mt-6 text-center">
    //                 <Link
    //                     to="/login"
    //                     className="text-blue-600 hover:underline dark:text-blue-400 flex items-center justify-center"
    //                 >
    //                     <IoIosArrowRoundBack className="mx-2" /> Back to log in
    //                 </Link>
    //             </div>
    //         </div>
    //     </div>

    // )





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