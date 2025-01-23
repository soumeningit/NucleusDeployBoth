import React from 'react'

function Card({ img, text, number }) {
    return (
        <div className='bg-blue-25 rounded-lg p-3 m-2 font-nunitoSans flex items-center justify-start py-6 px-6 shadow-md gap-x-4 w-60 md:w-48 lg:w-1/4 md:m-0 lg:self-start bg-transparent'>
            <img src={img} alt="" className='w-8 h-8 flex-shrink-0' />
            <div>
                <h4 className='text-lg md:text-xl leading-[26px] md:leading-[30px] font-interSans font-bold text-gray-850'>{number}</h4>
                <p className='text-sm md:text-base leading-[21px] md:leading-6 font-normal text-gray-850'>{text}</p>
            </div>
        </div >
    )
}

export default Card