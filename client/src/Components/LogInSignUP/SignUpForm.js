import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { setSignUpData } from '../../Slices/authSlice';
import { sendOTP } from '../../service/authAPI';

function SignUpForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showCreatePass, setShowCreatePass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [formDta, setFormDta] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    );

    const [accountType, setAccountType] = useState("Student");

    const { firstName, lastName, email, password, confirmPassword } = formDta;

    function changeHandler(event) {
        setFormDta(prevDta => {
            return ({
                ...prevDta,
                [event.target.name]: event.target.value
            })
        });
    }

    const signupData = {
        ...formDta,
        accountType,
    }

    function submitHandler(event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        console.log("Sign Up Data : ".signUpData)
        dispatch(setSignUpData(signupData));
        dispatch(sendOTP(formDta.email, navigate))
    }

    function createPassHandler() {
        setShowCreatePass(!showCreatePass);
    }

    function comfirmPassHandler() {
        setShowConfirmPass(!showConfirmPass);
    }

    function studentBtnHandeler() {
        setAccountType("Student")
    }
    function instructorBtnHandeler() {
        setAccountType("Instructor")
    }
    return (
        <div className='w-full'>
            <div className='flex gap-x-2 p-1 max-w-max mt-4 rounded-full bg-richblack-800'>
                <button className={`${accountType === "Student"
                    ? "bg-richblack-900 text-richblack-5"
                    : "bg-transparent text-richblack-200 "
                    } py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={studentBtnHandeler}
                >
                    Student
                </button>
                <button className={`${accountType === "Instructor"
                    ? "bg-richblack-900 text-richblack-5"
                    : "bg-transparent text-richblack-200 "
                    } py-2 px-5 rounded-full transition-all`}
                    onClick={instructorBtnHandeler}
                >
                    Instructor
                </button>
            </div>

            <form onSubmit={submitHandler}>
                <div className='w-full flex gap-x-5 mt-4'>
                    <label className='w-full '>
                        <div className='text-[0.875rem] text-richblack-400 mb-1 leading-[1.375rem]'>
                            First Name
                            <sup className='text-pink-200'>*</sup>
                        </div>
                        <input type="text"
                            required
                            name='firstName'
                            value={formDta.firstName}
                            placeholder='Enter First Name'
                            onChange={changeHandler}
                            className='bg-richblack-700 border border-1 border-richblack-700 rounded-[0.875rem] p-[12px] text-richblack-5 w-full'
                        />
                    </label>

                    <label className='w-full'>
                        <div className='text-[0.875rem] text-richblack-400 mb-1 leading-[1.375rem]'>
                            Last Name
                            <sup className='text-pink-200'>*</sup>
                        </div>
                        <input type="text"
                            required
                            name='lastName'
                            value={formDta.lastName}
                            placeholder='Enter Last Name'
                            onChange={changeHandler}
                            className='bg-richblack-700 border border-1 border-richblack-700 rounded-[0.875rem] p-[12px] text-richblack-5 w-full'
                        />
                    </label>
                </div>

                <div className='mt-4'>
                    <label className='w-full'>
                        <div className='text-[0.875rem] text-richblack-400 mb-1 leading-[1.375rem]'>
                            Email Address
                            <sup className='text-pink-200'>*</sup>
                        </div>
                        <input type="email"
                            required
                            name='email'
                            value={formDta.email}
                            placeholder='Enter email'
                            onChange={changeHandler}
                            className='bg-richblack-700 border border-1 border-richblack-700 rounded-[0.875rem] p-[12px] text-richblack-5 w-full'
                        />
                    </label>
                </div>

                <div className='w-full flex gap-x-5 mt-4'>
                    <label className='w-full relative'>
                        <div className='text-[0.875rem] text-richblack-400 mb-1 leading-[1.375rem]'>
                            Create Password
                            <sup className='text-pink-200'>*</sup>
                        </div>
                        <input type={showCreatePass ? 'text' : 'password'}
                            required
                            name='password'
                            value={formDta.password}
                            placeholder='Create Password'
                            onChange={changeHandler}
                            className='bg-richblack-700 border border-1 border-richblack-700 rounded-[0.875rem] p-[12px] text-richblack-5 w-full'
                        />
                        <span onClick={createPassHandler} className='absolute right-3 top-[38px] cursor-pointer mt-1'>
                            {
                                showCreatePass ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                            }
                        </span>
                    </label>

                    <label className='w-full relative'>
                        <div className='text-[0.875rem] text-richblack-400 mb-1 leading-[1.375rem]'>
                            Confirm Paassword
                            <sup className='text-pink-200'>*</sup>
                        </div>
                        <input type={showConfirmPass ? 'text' : 'password'}
                            required
                            name='confirmPassword'
                            value={formDta.confirmPassword}
                            placeholder='Confirm Password'
                            onChange={changeHandler}
                            className='bg-richblack-700 border border-1 border-richblack-700 rounded-[0.875rem] p-[12px] text-richblack-5 w-full'
                        />
                        <span onClick={comfirmPassHandler} className="absolute right-3 top-[38px] cursor-pointer mt-1">
                            {
                                showConfirmPass ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                            }
                        </span>
                    </label>
                </div>

                <button type='submit'
                    className='w-full bg-yellow-50 text-richblack-900 text-sm py-2 px-4 rounded-md mt-4'
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignUpForm