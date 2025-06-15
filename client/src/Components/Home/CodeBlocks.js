// import React from 'react'
// import CTAButton from './CTAButton'
// import { TypeAnimation } from 'react-type-animation'

// function CodeBlocks({ heading, subheading, btn1, btn2, backgroundGradient, codeColor, codeblock }) {
//     return (
//         <>
//             <div className='flex flex-col w-[45%] p-4'>
//                 <div className='flex flex-col gap-4'>
//                     {heading}
//                     {subheading}
//                 </div>
//                 {/* button */}
//                 <div className='flex flex-row gap-4 mt-4 p-4'>
//                     <CTAButton text={btn1.text} active={btn1.active} linkto={btn1.linkto} />
//                     <CTAButton text={btn2.text} active={btn2.active} linkto={btn2.linkto} />
//                 </div>
//             </div>

//             {/* dynamic content */}

//             <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
//                 {backgroundGradient}
//                 {/* Indexing */}
//                 <div className="text-center flex flex-col  w-[10%] select-none text-richblack-400 font-inter font-bold ">
//                     <p>1</p>
//                     <p>2</p>
//                     <p>3</p>
//                     <p>4</p>
//                     <p>5</p>
//                     <p>6</p>
//                     <p>7</p>
//                     <p>8</p>
//                     <p>9</p>
//                     <p>10</p>
//                     <p>11</p>
//                 </div>

//                 {/* Codes */}
//                 <div
//                     className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
//                 >
//                     <TypeAnimation
//                         sequence={[codeblock, 1000, ""]}
//                         cursor={true}
//                         repeat={Infinity}
//                         style={{
//                             whiteSpace: "pre-line",
//                             display: "block",
//                         }}
//                         omitDeletionAnimation={true}
//                     />
//                 </div>
//             </div>
//         </>
//     )
// }

// export default CodeBlocks

import React from 'react';
import CTAButton from './CTAButton';
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({ heading, subheading, btn1, btn2, backgroundGradient, codeColor, codeblock }) {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 p-6 lg:p-12">
            {/* Text Section */}
            <div className="flex flex-col w-full lg:w-[45%] gap-6">
                <div className="flex flex-col gap-4">
                    {heading}
                    {subheading}
                </div>
                {/* Buttons */}
                <div className="flex flex-row gap-4 mt-4 ml-4">
                    <CTAButton text={btn1.text} active={btn1.active} linkto={btn1.linkto} />
                    <CTAButton text={btn2.text} active={btn2.active} linkto={btn2.linkto} />
                </div>
            </div>

            {/* Code Animation Section */}
            <div className="relative w-full lg:w-[50%] bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* Background Gradient */}
                {backgroundGradient}
                {/* Code Index */}
                <div className="flex">
                    <div className="text-center flex flex-col w-[10%] select-none text-gray-400 font-mono font-semibold bg-gray-900 py-3">
                        {[...Array(11).keys()].map((line) => (
                            <p key={line + 1}>{line + 1}</p>
                        ))}
                    </div>
                    {/* Code Display */}
                    <div className={`w-[90%] p-4 text-xs sm:text-sm leading-6 font-mono ${codeColor}`}>
                        <TypeAnimation
                            sequence={[codeblock, 1000, '']}
                            cursor={true}
                            repeat={Infinity}
                            style={{
                                whiteSpace: 'pre-line',
                                display: 'block',
                            }}
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeBlocks;
