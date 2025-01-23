import React from 'react'
import Login from '../../Pages/Login'
import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'
import frame from '../../assets/frame.png'
import { FcGoogle } from "react-icons/fc";

function Template({ heading, description1, description2, img, formtype, setIsLoggedIn }) {
    return (
        <div className='flex w-11/12 max-w-[1160px] mx-auto py-12 gap-y-0 gap-x-12 justify-between'>
            <div className='w-11/12 max-w-[450px] mx-0 text-white'>
                <h2 className='text-richblack-5 font-semibold text-2xl leading-[2.375rem]'>{heading}</h2>
                <div className='text-md mt-4'>
                    <span className='text-richblack-100 '>{description1}</span>
                    <br />
                    <span className='text-blue-100 italic'>{description2}</span>
                </div>
                {
                    formtype === "login" ? (<LogInForm setIsLoggedIn={setIsLoggedIn} />) : (<SignUpForm setIsLoggedIn={setIsLoggedIn} />)
                }
                <div className='flex items-center gap-x-4 w-full mt-4'>
                    <div className='w-full h-[0.05rem] bg-richblack-700'></div>
                    <p className='text-richblack-700 font-medium leading-[1.375rem]'></p> OR
                    <div className='w-full h-[0.05rem] bg-richblack-700'></div>
                </div>
                <button className='border border-richblack-700 w-full py-1 px-4 text-sm rounded-md flex items-center justify-center text-richblack-100 gap-x-2 font-medium mt-4'>
                    <FcGoogle />
                    Sign in with Google
                </button>
            </div>

            <div className='w-11/12 max-w-[450px] relative'>
                <img src={frame}
                    alt="frame"
                    width={558}
                    height={504}
                    loading="lazy"
                />
                <img
                    src={img}
                    alt="img"
                    width={558}
                    height={504}
                    loading="lazy"
                    className='absolute -top-4 right-4'
                />
            </div>

        </div>
    )
}

export default Template