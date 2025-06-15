import React from 'react';
import { Link } from 'react-router-dom';
import { buyCourse } from '../../service/Operation/PaymentAPI';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addToCartAPI } from '../../service/Operation/CartAPI';
import { useEffect } from 'react';

function CourseBuyCard({ courses }) {

    const rating = "4.4 ★";
    const reviews = "9,181";
    const badge = "Bestseller";

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const [course, setCourse] = useState(null)
    const [isEnrolled, setIsEnrolled] = useState(false)

    console.log("token in CourseLandingPage : ", token)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courseId } = useParams();

    console.log("courseId in CourseBuyCard : ", courseId);

    function paymentHandler(event) {
        event.preventDefault();

        if (token) {
            try {
                const response = buyCourse(token, [courseId], user, navigate, dispatch);
                console.log("Response in CourseLandingPage : ", response);
                return;
            }
            catch (error) {
                console.log("Error in calling buyCourse : ", error);
            }
        }
    }

    // const isEnrolled = courses?.data?.studentsEnrolled && courses?.data?.studentsEnrolled?.includes(courseId) ??false
    // console.log("isEnrolled in CourseLandingPage : ", isEnrolled);
    // let isEnrolled = false;
    useEffect(() => {
        if (courses?.data?.studentsEnrolled) {
            setIsEnrolled(courses?.data?.studentsEnrolled.includes(courseId));
        }
    }, [courses, courseId]);

    console.log("isEnrolled in CourseLandingPage : ", isEnrolled);

    const cartHandler = async () => {
        try {
            const addToCartResponse = await addToCartAPI([courseId], token);
            console.log("addToCartResponse in CourseLandingPage : ", addToCartResponse);
        }
        catch (e) {
            console.log("Error in CourseLandingPage : ", e);

        }
    }


    return (
        <div>
            <div className="w-full max-w-[25rem] border-1 border-pure-greys-5 mx-auto bg-white/30 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105">
                <Link to="">
                    <img className="w-full h-48 object-cover" src={courses?.data?.thumbnail} alt={courses?.data?.courseName} />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">{courses?.data?.courseName}</h3>
                        <p className="text-gray-700">{`${courses?.data?.instructor?.firstName} ${courses?.data?.instructor?.lastName}`}</p>
                        <div className="flex items-center my-2">
                            <span className="text-yellow-500">{rating}</span>
                            <span className="ml-2 text-gray-600">({reviews})</span>
                        </div>
                        <div className='flex flex-col gap-2 mt-2'>
                            {
                                isEnrolled ?
                                    (
                                        <>
                                            <button
                                                onClick={() => navigate("/dashboard/enrolled-courses")}
                                                class="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-green-500"
                                            >
                                                <span class="font-bold text-white text-xl relative z-10 group-hover:text-[#47ad47] duration-500">Go To Course</span>
                                                <span class='absolute top-0 left-0 w-full bg-caribbeangreen-500 duration-500 group-hover:-translate-x-full h-full'></span>
                                                <span class="absolute top-0 left-0 w-full bg-caribbeangreen-500 duration-500 group-hover:translate-x-full h-full"></span>

                                                <span class="absolute top-0 left-0 w-full bg-caribbeangreen-500 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
                                                <span class="absolute delay-300 top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full"></span>
                                            </button>

                                        </>
                                    ) :
                                    (
                                        <>
                                            <button
                                                onClick={paymentHandler}
                                                class="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-green-500"
                                            >
                                                <span class="font-bold text-white text-xl relative z-10 group-hover:text-green-500 duration-500">Buy Course</span>
                                                <span class="absolute top-0 left-0 w-full bg-caribbeangreen-500 duration-500 group-hover:-translate-x-full h-full"></span>
                                                <span class="absolute top-0 left-0 w-full bg-caribbeangreen-500 duration-500 group-hover:translate-x-full h-full"></span>

                                                <span class="absolute top-0 left-0 w-full bg-caribbeangreen-500 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
                                                <span class="absolute delay-300 top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full"></span>
                                            </button>
                                        </>
                                    )
                            }
                            <button
                                onClick={cartHandler}
                                class="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                            >
                                Add To Cart
                            </button>

                        </div>
                        <p className="text-xl font-bold text-gray-900">₹{courses?.data?.price}</p>
                        {badge && (
                            <span className="inline-block bg-yellow-300 text-yellow-800 text-xs font-semibold mt-2 px-2 py-1 rounded">
                                {badge}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default CourseBuyCard