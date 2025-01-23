import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../service/authAPI'

function Logout() {

    const [formDta, setFormDta] = useState({ email: "" })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function changeHandler(event) {
        setFormDta(prevDta => {
            return {
                ...prevDta,
                [event.target.name]: event.target.value
            }
        });
    }

    const { email } = formDta.email;
    console.log("Email : ", email)

    function logoutHandler() {
        dispatch(logout(email, navigate));
    }


    return (
        <div>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
                <h1 className="text-2xl font-bold text-center">LogOut</h1>
                <form onClick={logoutHandler}
                    className="space-y-6">
                    <div className="space-y-1 text-sm">
                        {/* <label htmlFor="username" className="block dark:text-gray-600">Username</label> */}
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Username"
                            value={formDta.email}
                            onChange={changeHandler}
                            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                        />
                    </div>
                    <button type='submit'
                        className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600">Log Out</button>
                </form>
            </div>
        </div>
    )
}

export default Logout