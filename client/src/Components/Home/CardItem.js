import React from 'react'
import { BsArrowUpRight } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

function CardItem({ img, number, text }) {

    const navigate = useNavigate();

    return (
        <>
            <div className="flex max-w-2xl flex-col items-center rounded-md border border-blue-50 md:flex-row shadow-lg shadow-transparent">
                <img
                    src={img}
                    alt={text}
                    className="h-14 w-14 rounded-md object-cover items-center"
                />
                {/* <div className="h-full w-full items-center justify-center md:h-[200px] md:w-[300px]">
                    <img
                        src={img}
                        alt={text}
                        className="h-14 w-14 rounded-md object-cover items-center"
                    />
                </div> */}
                <div>
                    <div className="p-4">
                        {/* <h1 className="inline-flex items-center text-lg font-semibold">
                            About us <BsArrowUpRight className='ml-2 h-4 w-4' onClick={() => navigate("/login")} />
                        </h1> */}
                        <p className="mt-3 text-sm text-gray-600">
                            {text}
                        </p>
                        <div className="mt-3 flex items-center space-x-2">
                            {/* <img
                                className="inline-block h-8 w-8 rounded-full"
                                src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                                alt="Dan_Abromov"
                            /> */}
                            <span className="flex flex-col">
                                <span className="text-[10px] font-medium text-gray-900">Nucleus</span>
                                <span className="text-[8px] font-medium text-gray-500">@Nucleus</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardItem