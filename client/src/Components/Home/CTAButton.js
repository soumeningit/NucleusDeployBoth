import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({ text, active, linkto }) {
    return (
        <div>
            <Link to={linkto}>
                <button className={`text-center text-[14px] px-6 py-2 rounded-md font-bold
                    ${active ? "bg-blue-900 text-white" : "bg-richblack-100"}
                    hover:scale-95 transition-all duration-200`
                }
                >
                    {text}
                </button>
            </Link>
        </div>
    )
}

export default CTAButton