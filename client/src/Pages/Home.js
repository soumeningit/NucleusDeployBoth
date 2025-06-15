import React, { useEffect, useState } from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";
import bgImg from "../assets/hero_section_image_new.jpg";
import somoneCodingImage from '../assets/somoneCoding.webp'
import CTAButton from '../Components/Home/CTAButton';
import CodeBlocks from '../Components/Home/CodeBlocks';
import HighlightText from '../Components/Home/HighlightText';
import logo1 from '../assets/Logo1.svg'
import logo2 from '../assets/Logo2.svg'
import logo3 from '../assets/Logo3.svg'
import logo4 from '../assets/Logo4.svg'
import reading from '../assets/reading.jpg'
import instructor from '../assets/instructure_image.png'
import FAQSection from '../Components/Home/FAQItem';
import CardItem from '../Components/Home/CardItem';
import Footer from './Footer';
import { getAllCourses } from '../service/CourseAPI';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Home() {

    const logos = [
        { img: logo1, number: "Leadership", text: "Fully committed to the success company" },
        { img: logo2, number: "Leadership", text: "Fully committed to the success company" },
        { img: logo3, number: "Leadership", text: "Fully committed to the success company" },
        { img: logo4, number: "Leadership", text: "Fully committed to the success company" },
    ];

    const [text] = useTypewriter({
        words: ['PRACTICAL', 'AFFORDABLE', 'EASY TO LEARN'],
        loop: {},
        typeSpeed: 200,
        deleteSpeed: 200,
    })

    const [allCourses, setAllCourses] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getAllCourses();
                // console.log("Response in home page : ", response);
                setAllCourses(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCourses();
    }, [token])

    // console.log("All courses : ", allCourses);


    return (
        <div className="relative flex flex-col overflow-hidden font-inter bg-[#5d646452]">
            {/* Hero Section */}
            <section className="flex justify-evenly mt-4 gap-x-6 mx-auto">
                <div className="p-6 w-[45%]">
                    <p className="font-bold text-4xl w-full">
                        Stay Ahead Of The Curve With Our
                        <span className="flex text-pink-200">
                            <FaLessThan className="text-4xl mt-1" /> {text}{" "}
                            <Cursor cursorColor="red" className="text-4xl font-bold" />{" "}
                            <FaGreaterThan className="text-4xl mt-1" />
                        </span>
                        Courses
                    </p>
                    <p className="font-medium text-lg mt-4">
                        Nucleous is your one-stop-shop for upscaling. Get maximum value for time
                        and resources you invest, with job-ready courses & high-technology,
                        available at the lowest cost.
                    </p>
                    <div className="group bg-blue-800 text-blue-5 rounded-md transition-all duration-200 hover:scale-95 w-fit mt-16">
                        <button className="px-4 py-2 transition-all duration-200 group-hover:bg-blue-900">
                            Explore Courses
                        </button>
                    </div>
                </div>
                <div className="w-[45%]">
                    <img
                        src={bgImg}
                        loading="lazy"
                        alt="hero_section_image"
                        className="object-cover rounded-md shadow-lg"
                    />
                </div>
            </section>

            {/* Educational Excellence Section */}
            <section className="mt-[16rem] flex justify-between mx-auto">
                <div className="flex flex-col w-[45%] gap-y-4 p-6 ml-[2rem]">
                    <h2 className="text-4xl">
                        Where
                        <span className="px-1 bg-gradient-to-r from-[#b7648b] via-[#c4586c] to-[#e90e66] text-transparent bg-clip-text">
                            Education
                        </span>
                        Exceeds Expectations
                    </h2>
                    <p className="text-lg font-medium mt-4">
                        We are transforming your path to launching your career by offering programs
                        that provide the guidance of expert educators.
                    </p>
                    <div className="flex flex-row mt-8 gap-8">
                        <CTAButton text={"Know More"} active={true} linkto={"/signUp"} />
                        <CTAButton text={"Book Demo"} active={false} linkto={"/login"} />
                    </div>
                </div>
                <div className="w-[45%]">
                    <img
                        src={somoneCodingImage}
                        alt=""
                        className="rounded-md h-[400px] w-[450px] shadow-lg"
                    />
                </div>
            </section>

            {/* CodeBlocks Section */}
            <section className="flex flex-row mt-[16rem] justify-between mx-auto">
                <CodeBlocks
                    heading={
                        <div className="text-4xl font-semibold p-4">
                            Unlock your <HighlightText text={"coding potential"} /> with our online courses.
                        </div>
                    }
                    subheading={
                        <div className="text-lg p-4">
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        </div>
                    }
                    btn1={{
                        text: "Try it Yourself",
                        linkto: "/signup",
                        active: true,
                    }}
                    btn2={{
                        text: "Learn More",
                        linkto: "/signup",
                        active: false,
                    }}
                    codeColor={"text-blue-400"}
                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                />
            </section>

            {/* Courses Section */}
            <section className="flex flex-col mt-16 p-6 mx-auto">
                <h2 className="font-bold text-xl text-center">All the skills you need in one place</h2>
                <p className="text-md mt-2">
                    From critical skills to technical topics, We supports your professional
                    development.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {allCourses?.slice(0, 6)?.map((course, indx) => (
                        <div key={indx} className="bg-white rounded-lg shadow-md p-4">
                            <img
                                src={course?.thumbnail}
                                alt={course?.courseName}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <span className="text-lg font-bold flex items-center">
                                <img
                                    src={course?.instructor?.image}
                                    alt="instructor-image"
                                    className="h-6 w-6 rounded-full mr-2"
                                />{" "}
                                {course?.instructor?.firstName} {course?.instructor?.lastName}
                            </span>
                            <h2 className="text-lg font-bold mt-2">{course?.courseName}</h2>
                            <p className="text-md mt-2">{course?.description}</p>
                            <p className="mt-2">Price : ₹ {course?.price}</p>
                            <p className="mt-2">Students : {course?.studentsEnrolled.length}</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => navigate('/allcourses', { state: { allCourses } })}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 max-w-fit"
                >
                    All Courses
                </button>
            </section>

            {/* Instructor Section */}
            <section className="w-full gap-16 flex flex-row justify-center mt-16 text-richblue-400">
                <div className="mt-16">
                    <img
                        src={instructor}
                        alt=""
                        loading="lazy"
                        className="h-96 w-96 rounded-md shadow-lg"
                    />
                </div>
                <div className="flex flex-col justify-center space-y-6">
                    <h1 className="font-semibold text-xl">
                        Become an <HighlightText text={"instructor"} />
                    </h1>
                    <p className="text-md max-w-md">
                        Instructors spanning the globe educate millions of students through Nucleus,
                        empowering them with the tools and expertise to share their passions.
                    </p>
                    <CTAButton text={"Instructor"} linkto={"/signup"} active={true} />
                </div>
            </section>

            <div className="mt-[16rem]">
                <FAQSection />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );

}

export default Home