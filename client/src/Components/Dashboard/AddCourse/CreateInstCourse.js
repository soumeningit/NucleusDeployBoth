import React from 'react'
import { useState } from 'react';
import { GiPreviousButton } from 'react-icons/gi';
import { IoCheckmark } from "react-icons/io5";
import CourseInfo from './Form/CourseInfo';
import CourseBuild from './Form/CourseBuild';
import Publish from './Form/Publish';

const steps = [
    { label: 'Course Information', step: 1 },
    { label: 'Course Build', step: 2 },
    { label: 'Course Publish', step: 3 },
]

function CreateInstCourse() {

    const [currStep, setCurrStep] = useState(1)
    // const [currStep, setCurrStep] = useState(1);

    const totalSteps = steps.length;

    const previousStep = () => {
        setCurrStep(currStep - 1)
    }

    const nextStep = () => {
        setCurrStep(currStep + 1);
    }

    function renderForm() {
        switch (currStep) {
            case 1:
                return <CourseInfo />
            case 2:
                return <CourseBuild />
            case 3:
                return <Publish />
            default:
                return null;
        }
    }

    const width = `${(100 / (totalSteps - 1)) * (currStep - 1)}%`

    return (
        <>
            <div className='w-full max-w-lg mx-auto p-4'>
                <div className='relative flex justify-between mt-16'>
                    <div className="absolute bg-pink-200 h-1 w-full top-1/2 transform -translate-y-1/2"></div>
                    <div
                        className="absolute bg-[#c20cc2] h-1 top-1/2 transform -translate-y-1/2 transition-width duration-400 ease"
                        style={{ width }}
                    ></div>
                    {
                        steps.map((step, index) => (

                            <div className='relative z-10 text-center' key={index}>
                                <div className={`h-10 w-10 rounded-full justify-center items-center
                                        ${currStep > step.step ?
                                        'bg-white border-4 border-purple-800'
                                        : 'bg-white border-4 border-pink-200'
                                    }`}
                                >
                                    {
                                        currStep > step.step ? (
                                            <div className='text-2xl font-semibold transform text-[#c20cc2] translate-y-1 translate-x-1'>
                                                <IoCheckmark />
                                            </div>
                                        ) : (
                                            <span className='text-2xl font-semibold transform text-[#c20cc2]'>
                                                {step.step}
                                            </span>
                                        )
                                    }
                                </div>
                                <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                                    <span className="text-white text-sm inline-block whitespace-nowrap ">{step.label}</span>
                                </div>
                            </div>

                        )
                        )
                    }

                </div>

                {/* render all form here */}
                <div className='mt-16'>
                    {
                        renderForm()
                    }
                </div>

                {/* button */}
                <div className='flex justify-between mt-4'>
                    <button
                        className="rounded-md bg-[purple] text-white py-2 px-4 disabled:bg-pink-200 disabled:text-black disabled:cursor-not-allowed"
                        onClick={previousStep}
                        hidden={currStep === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="rounded-md bg-blue-700 text-white py-2 px-4 disabled:bg-pink-200 disabled:text-black disabled:cursor-not-allowed"
                        onClick={nextStep}
                        hidden={currStep === totalSteps}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateInstCourse


// import React, { useState } from 'react'

// function createCourse() {

//     const steps = [
//         { label: 'Course Information', step: 1 },
//         { label: 'Course Build', step: 1 },
//         { label: 'Course Publish', step: 1 },
//     ]

//     const [currStep, setCurrStep] = useState(1);

//     const totalSteps = steps.length;


//     const width = `${(100 / (totalSteps - 1)) * (currStep - 1)}%`

//     return (
//         <>
//             <div className='w-full max-w-lg mx-auto p-4'>
//                 <div className='relative flex justify-between mt-16'>
//                     <div className="absolute bg-pink-200 h-1 w-full top-1/2 transform -translate-y-1/2"></div>
//                     <div
//                         className="absolute bg-purple-800 h-1 top-1/2 transform -translate-y-1/2 transition-width duration-400 ease"
//                         style={{ width }}
//                     ></div>

//                 </div>
//             </div>
//         </>
//     )
// }

// export default createCourse