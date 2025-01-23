import React, { useDebugValue, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../service/UserCourseAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { setCourse } from '../../Slices/courseSlice';


function EnrolledCourses() {

    const { token } = useSelector((state) => state.auth);
    console.log("Token Inside Enrolled Course : ", token)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const decodedToken = jwtDecode(token);
    console.log("decodedToken ", decodedToken)
    const isTokenExpired = decodedToken.exp * 2000 < Date.now();
    console.log("Is token expired: ", isTokenExpired);


    const [enrolledCourse, setEnrolledCourse] = useState(null)

    const getAllEnrolledCourse = async () => {
        try {
            localStorage.setItem("enrolledCourse", true);
            console.log("Calling API..")
            const response = await getUserEnrolledCourses(token, dispatch)
            setEnrolledCourse(response);
            dispatch(setCourse(response));
            console.log("response in getAllEnrolledCourse : ", response)
        }
        catch (e) {
            console.log("Can't get all enrolled course details")
            console.log(e);
        }
    }

    useEffect(() => {
        // if (enrolledCourse === null) {
        getAllEnrolledCourse();

    }, []);

    console.log("enrolledCourse : ", enrolledCourse);


    return (
        // <div className='text-white'>
        //     <h1 className='text-white'>Enrolled Courses </h1>
        //     {
        //         !enrolledCourse ? (<div>Loading...</div>)
        //             : enrolledCourse.length === 0 ? (<p>You Not enrolled any course Yet.</p>)
        //                 :
        //                 (
        //                     <div className='flex justify-between mt-14'>
        //                         <p>Course Name</p>
        //                         <p>Duration</p>
        //                         <p>Progress</p>
        //                     </div>
        //                     {
        //         enrolledCourse.map((course, index) => {
        //             return (
        //                 <div>
        //                     <img src={course.thumbnail} alt="course-thumbnail" loading='lazy' className='h-8 w-8 rounded-md' />
        //                     <div>
        //                         <p>{course.courseName}</p>
        //                         <p>{course.courseDescription}</p>
        //                     </div>
        //                     <div>
        //                         <p>{course.duration}</p>
        //                     </div>
        //                     <div>
        //                         <p>{course.progress}%</p>
        //                         <ProgressBar
        //                             completed={course.progress || 0}
        //                             barContainerClassName="container"
        //                             completedClassName="barCompleted"
        //                             labelClassName="label"
        //                         />
        //                     </div>
        //                 </div>
        //             )
        //         })
        //     }
        //     )
        //     )
        //         }
        //     )
        // </div>

        <>
            <div className="text-3xl text-richblack-50">Enrolled Courses</div>
            {!enrolledCourse ? (
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                    <div className="spinner"></div>
                </div>
            ) : !enrolledCourse.length ? (
                <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                    You have not enrolled in any course yet.
                    {/* TODO: Modify this Empty State */}
                </p>
            ) : (
                <div className="my-8 text-richblack-5">
                    {/* Headings */}
                    <div className="flex rounded-t-lg bg-richblack-500 ">
                        <p className="w-[45%] px-5 py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-3">Duration</p>
                        <p className="flex-1 px-2 py-3">Progress</p>
                    </div>
                    {/* Course Names */}
                    {enrolledCourse.map((course, i, arr) => (
                        <div
                            className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                }`}
                            key={i}
                        >
                            <div
                                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                onClick={() => {
                                    navigate(
                                        `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                    )
                                }}
                            >
                                <img
                                    src={course.thumbnail}
                                    alt="course_img"
                                    className="h-14 w-14 rounded-lg object-cover"
                                />
                                <div className="flex max-w-xs flex-col gap-2">
                                    <p className="font-semibold">{course.courseName}</p>
                                    <p className="text-xs text-richblack-300">
                                        {course.courseDescription.length > 50
                                            ? `${course.courseDescription.slice(0, 50)}...`
                                            : course.courseDescription}
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/4 px-2 py-3">{course?.duration}</div>
                            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                <p>Progress: {course.progressPercentage || 0}%</p>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height="8px"
                                    isLabelVisible={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default EnrolledCourses





/*
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../service/UserCourseAPI';
import ProgressBar from "@ramonak/react-progress-bar";

function EnrolledCourses() {
    const { token } = useSelector((state) => state.auth);

    const [enrolledCourse, setEnrolledCourse] = useState([]);

    const getAllEnrolledCourse = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            if (Array.isArray(response)) {
                setEnrolledCourse(response);
            } else {
                console.error("Expected an array but got: ", response);
                setEnrolledCourse([]);
            }
            console.log("response : ", response);
        } catch (e) {
            console.log("Can't get all enrolled course details");
            console.log(e);
            setEnrolledCourse([]);
        }
    };

    useEffect(() => {
        getAllEnrolledCourse();
    }, []);

    return (
        <div className='text-white'>
            <h1 className='text-white'>Enrolled Courses</h1>
            {
                enrolledCourse.length === 0 ? (
                    <p>You are not enrolled in any course yet.</p>
                ) : (
                    <>
                        <div className='flex justify-between mt-14'>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>
                        {enrolledCourse.map((course, index) => (
                            <div key={index} className='flex items-center mt-4'>
                                <img
                                    src={course.thumbnail}
                                    alt="course-thumbnail"
                                    loading='lazy'
                                    className='h-8 w-8 rounded-md'
                                />
                                <div className='ml-4'>
                                    <p>{course.courseName}</p>
                                    <p>{course.courseDescription}</p>
                                </div>
                                <div className='ml-4'>
                                    <p>{course.duration}</p>
                                </div>
                                <div className='ml-4'>
                                    <p>{course.progress}%</p>
                                    <ProgressBar
                                        completed={course.progress || 0}
                                        barContainerClassName="container"
                                        completedClassName="barCompleted"
                                        labelClassName="label"
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
        </div>
    );
}

export default EnrolledCourses;
*/

