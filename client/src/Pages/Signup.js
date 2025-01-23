import React from 'react'
import Template from '../Components/LogInSignUP/Template'
import signUpImg from '../assets/signup.png'

function Signup() {
    return (
        <Template
            heading="Join the millions learning to code with StudyNotion for free"
            description1="Build skills for today, tomorrow, and beyond."
            description2="Education to future-proof your career."
            img={signUpImg}
            formtype="signup"
        // setIsLoggedIn={setIsLoggedIn}
        />
    )
}

export default Signup