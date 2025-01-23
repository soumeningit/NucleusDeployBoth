import React from 'react'
import Template from '../Components/LogInSignUP/Template'
import logInImg from '../assets/login.png'

function Login({ setIsLoggedIn }) {
    return (
        <Template heading="Welcome Back"
            description1="Build skills for today, tomorrow, and beyond."
            description2="Education to future-proof your career."
            img={logInImg}
            formtype="login"
            setIsLoggedIn={setIsLoggedIn}
        />
    )
}

export default Login