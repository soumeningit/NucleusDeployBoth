import { useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTP, signUp } from "../../service/authAPI";

function VerifyEmail() {
    const [otp, setOtp] = useState('');

    const { signUpData } = useSelector((state) => state.auth);
    // console.log("SignUp Data inside verify email : ", signUpData);
    const navigate = useNavigate()

    // Prevent rendering if signUpData is null
    if (!signUpData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                <p className="text-red-500 text-lg font-semibold mb-2">
                    Please don't refresh the page before OTP submission is complete.
                </p>
                <Link
                    to="/signup"
                    className="text-blue-500 underline hover:text-blue-700 transition-colors"
                >
                    Go to Signup
                </Link>
            </div>
        );
    }

    const {
        firstName, lastName, email, password,
        confirmPassword, accountType,
    } = signUpData;


    // console.log("OTP in verify email : ", otp)
    // console.log("Acoount Type in verify email : ", accountType)

    function handleVerifyAndSignup(e) {
        e.preventDefault();
        try {
            signUp(firstName, lastName, email, password,
                confirmPassword, accountType, otp, navigate)
        } catch (error) {
            console.log("Error occurred during signup:", error);
        }
    }

    return (
        <div className="max-w-[500px] p-4 lg:p-8 mx-auto">
            <h1 className="text-richblack-400 font-semibold text-[1.875rem] leading-[2.375rem]">
                Verify Email
            </h1>
            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-200">
                A verification code has been sent to you. Enter the code below
            </p>
            <form onSubmit={handleVerifyAndSignup}>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => (
                        <input
                            {...props}
                            placeholder="-"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                        />
                    )}
                    containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                    }}
                />
                <button
                    type="submit"
                    className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-blue-800"
                >
                    Verify Email
                </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
                <Link to="/signup">
                    <p className="text-richblack-500 flex items-center gap-x-2">
                        <BiArrowBack /> Back To Signup
                    </p>
                </Link>
                <button
                    className="flex items-center text-blue-100 gap-x-2"
                    onClick={() => sendOTP(signUpData.email, navigate)}
                // onClick={resendButtonHandler}
                >
                    <RxCountdownTimer />
                    Resend it
                </button>
            </div>
        </div>
    );
}

export default VerifyEmail;


