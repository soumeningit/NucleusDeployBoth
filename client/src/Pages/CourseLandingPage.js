// src/components/CourseCard.jsx
import React from "react";
// import courseThumbnail from "../path/to/your/image.jpg"; // Update this path to your actual image path
import courseThumbnail from "../assets/statistics1.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../service/Operation/PaymentAPI";
import { fetchCourseDetails } from "../service/CourseAPI"
import { useEffect, useState } from "react";
import CourseBuyCard from "../Components/CourseCard/CourseBuyCard"
import Section from "./Section";

const CourseLandingPage = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const [course, setCourse] = useState(null)

    // console.log("token in CourseLandingPage : ", token)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courseId } = useParams();

    console.log("courseId in CourseLandingPage : " + courseId)

    function paymentHandler(event) {
        event.preventDefault();

        if (token) {
            const response = buyCourse(token, [courseId], user, navigate, dispatch);
            console.log("Response in CourseLandingPage : ", response);
            return;
        }
    }

    useEffect(() => {

        async function getCourseDetails() {
            try {

                const courseDetails = await fetchCourseDetails(courseId);
                console.log("courseDetails in CourseLandingPage : ", courseDetails)
                setCourse(courseDetails)
            } catch (error) {
                console.log("Error in CourseLandingPage : ", error)
            }
        }

        getCourseDetails();

    }, [courseId])

    const [showFullDescription, setShowFullDescription] = useState(false);

    // Function to toggle showing full description
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Truncate the description to first 10 words
    const truncatedDescription = course?.data?.courseDescription.split(' ').slice(0, 10).join(' ');


    return (
        <>
            <div>
                {/* Section 1 */}
                <section className="max-h-[30rem] bg-richblack-50 w-full flex flex-row gap-10 justify-center">
                    <div className=" mt-4 gap-y-4 flex flex-col w-[40%] border border-[red]">
                        <h1 className="text-xl font-bold">{course?.data?.courseName}</h1>
                        <p className="">{course?.data?.courseDescription}</p>
                        <div className="flex">
                            <p>Bestseller</p><p>rating</p><p>students enrolled</p>
                        </div>
                        <p>Created By :{course?.data?.instructor?.firstName} {course?.data?.instructor?.lastName} </p>
                    </div>
                    <div className="border-2 border-[green]">
                        <CourseBuyCard courses={course} />
                    </div>
                </section>

                {/* what will you learn */}
                {/* <section className="flex flex-col justify-center mx-auto mt-6">
                    <div className="w-full h-full max-w-[40rem] max-h-[22rem] border border-[#c4c2c2] shadow-lg mx-auto ">
                        <h1 className="text-xl font-bold text-wrap text-opacity-30 mb-8 mt-6">What Will You Learn</h1>
                        <div className=" flex justify-between gap-x-4 object-fit">
                            {course?.data?.whatYouWillLearn.map((data, index) => (
                                <ul key={index} className="flex max-w-[16rem]">
                                    <span className="mr-2">✔</span>
                                    {data}
                                </ul>
                            ))}
                        </div>
                    </div>

                </section> */}

                <section>
                    <div className="max-w-4xl mx-auto p-4">
                        <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {course?.data?.whatYouWillLearn.map((point, index) => (
                                <div key={index} className="flex items-center">
                                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <p>{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Course Content */}
                <section>
                    <div className="container max-w-4xl mx-auto p-4">
                        <h1 className="text-2xl font-bold mb-4">{course?.data?.courseName}</h1>
                        {course?.data?.courseContent.map((section) => (
                            <Section key={section._id} section={section} />
                        ))}
                    </div>
                </section>

                {/* Requirements */}
                <section>
                    <div className="flex flex-col justify-center mx-auto mt-6 mb-4 max-w-4xl">
                        <h1 className="text-2xl font-bold">Requirements</h1>
                        {
                            course?.data?.instructions.length > 0 &&
                            course?.data?.instructions.map((instruction, index) => (
                                <div key={index}>
                                    <li className="text-base">{instruction}</li>
                                </div>
                            ))
                        }

                    </div>
                </section>

                {/* Description */}
                <section>
                    <div className="w-full mx-auto mt-6 mb-6 max-w-4xl flex flex-col gap-2">
                        <h1 className="text-xl font-bold font-edu-sa text-pretty">Description</h1>
                        <p className="text-base">
                            {showFullDescription ? course?.data?.courseDescription : truncatedDescription}
                            {!showFullDescription && ' ... '}
                            <button className="underline text-[#f3b9b9]" onClick={toggleDescription}>
                                {showFullDescription ? ' read less' : ' read more'}
                            </button>
                        </p>
                    </div>
                </section>

                {/* About Instructor */}
                <section>
                    <div className="max-w-4xl mt-6 mb-6 mx-auto">
                        <h1 className="text-xl font-bold">About Instructor</h1>
                        <div className="flex gap-4">
                            <div className='mt-2 rounded-full h-[7rem] w-[6rem] bg-transparent' >
                                <img src={course?.data?.instructor?.image} alt="image" loading="lazy" className="rounded-full translate-x-2 translate-y-2 " />
                            </div>
                            <div className="mt-4 flex flex-col translate-y-4 font-bold text-base text-pretty">
                                <p className="text-base text-blue-100">{course?.data?.instructor?.firstName}{" "}{course?.data?.instructor?.lastName}</p>
                                <p>{course?.data?.instructor?.additionalDetails?.about ?? 'Lead Instructor'}</p>
                            </div>
                        </div>
                        <div className="flex flex-col text-base text-pure-greys-400 font-bold text-pretty">
                            <p>No Of Courses : <span>{course?.data?.instructor?.courses.length}</span></p>
                            <p>{course?.data?.instructor?.additionalDetails?.about ?? 'Lead Instructor'}</p>
                        </div>
                    </div>
                </section>

                {/* Footer */}

            </div>



            {/* <div className="flex items-center justify-center">
                <button onClick={paymentHandler}
                    className="bg-caribbeangreen-100 text-sm text-white px-2 py-1"
                >
                    Pay Now
                </button>
            </div> */}


            {/* <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
                <div className="md:w-1/3">
                    <img
                        src={courseThumbnail}
                        alt="Course Thumbnail"
                        className="rounded-lg w-full"
                    />
                </div>
                <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Numpy For Data Science - Real Time Exercises
                            </h2>
                            <p className="text-sm text-gray-500">First step towards Python's Numpy Library</p>
                            <div className="flex items-center mt-2">
                                <span className="text-yellow-500">★ 4.3</span>
                                <span className="ml-2 text-gray-500">(135 ratings) 22,268 students</span>
                            </div>
                            <p className="mt-2 text-gray-700">Created by Data Science Lovers</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-purple-600">₹549</p>
                            <p className="text-sm text-gray-500 line-through">₹799</p>
                            <p className="text-sm text-red-600">31% off</p>
                            <p className="text-sm text-red-600">7 hours left at this price!</p>
                        </div>
                    </div>
                    <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md">
                        Add to cart
                    </button>
                    <button className="mt-2 w-full bg-gray-200 text-gray-800 py-2 rounded-md">
                        Buy now
                    </button>
                </div>
            </div> */}
        </>
    );
};

export default CourseLandingPage;
