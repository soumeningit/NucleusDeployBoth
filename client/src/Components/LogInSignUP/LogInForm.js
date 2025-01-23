import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../service/authAPI';

function LogInForm(props) {

    // const setIsLoggedIn = props.setIsLoggedIn;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formDta, setFormDta] = useState({ email: "", password: "" })
    const [typePassword, settypePassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);

    function changeHandler(event) {
        setFormDta(prevDta => {
            return {
                ...prevDta,
                [event.target.name]: event.target.value
            }
        });
    }

    const { email, password } = formDta;

    console.log("Form Data inside loginform : ", formDta)

    function showHandler() {
        settypePassword(!typePassword);
    }

    function submitHandeler(event) {
        event.preventDefault();
        dispatch(logIn(email, password, navigate));
    }

    return (
        <div className=''>
            <form onSubmit={submitHandeler} action="#" className='flex flex-col w-full gap-y-4 mt-6'>
                <label className='w-full'>
                    <div className='text-[0.875rem] text-richblack-200 mb-1 leading-[1.375rem]'>
                        Email Address<sup className='text-pink-200'>*</sup>
                    </div>
                    <input type="email"
                        required
                        placeholder='Enter email address'
                        name="email"
                        value={formDta.email}
                        onChange={changeHandler}
                        className='bg-richblack-700 border border-1 border-richblack-700 rounded-[0.875rem] p-[12px] text-richblack-5 w-full'
                    />
                </label>

                <label className='w-full relative'>
                    <div className='text-[0.875rem] text-richblack-400 mb-1 leading-[1.375rem]'>
                        Password
                        <sup className='text-pink-200'>*</sup>
                    </div>

                    <input type={typePassword ? "text" : "password"}
                        required
                        placeholder='Enter Password'
                        name="password"
                        value={formDta.password}
                        onChange={changeHandler}
                        className='bg-richblack-700 border border-1 border-richblack-700 rounded-[0.875rem] p-[12px] text-richblack-5 w-full'
                    />
                    <span onClick={showHandler} className="absolute right-3 top-[38px] cursor-pointer mt-1">
                        {
                            typePassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                        }
                    </span>
                    <Link to="/forgot-password">
                        <p className='text-blue-100 text-xs max-w-max ml-auto'>Forgot Password</p>
                    </Link>
                </label>

                <button className='w-full bg-yellow-50 text-richblack-900 text-sm py-2 px-4 rounded-md'>Log In</button>
            </form>
        </div>
    )
}

export default LogInForm