// import React, { useEffect } from 'react'
// import { showDraftCourseAPI } from "../service/Operation/AdminAPI"
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useState } from 'react';

// function DraftCourse() {

//     const { token } = useSelector((state) => state.auth);
//     console.log("token in DraftCourse : ", token)
//     const navigate = useNavigate();

//     const [courses, setCourses] = useState([]);

//     async function getData() {
//         try {
//             const response = await showDraftCourseAPI(token, navigate);
//             console.log("response in DraftCourse : ", response)
//             if (response.success) {
//                 setCourses(response.data); // Set the fetched data into state
//             }
//         } catch (error) {
//             console.error("Failed to fetch draft courses:", error);
//         }
//     }

//     console.log("courses : ", courses)

//     useEffect(() => {
//         getData()
//     }, [])

//     return (

//         <div>
//             <h1>Draft Course</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {courses.map((course) => (
//                     <div key={course._id} className="border p-4 rounded-lg shadow-lg">
//                         <img src={course.thumbnail} alt={course.courseName} className="w-full h-32 object-cover rounded-t-lg" />
//                         <h2 className="text-xl font-semibold mt-2">{course.courseName}</h2>
//                         <p className="text-gray-600">Price: ${course.price}</p>
//                         <p className="text-gray-600">Instructor: {course.instructor.firstName} {course.instructor.lastName}</p>
//                         <p className="text-gray-600">Status: Draft</p>
//                         <p className="text-gray-600">Rating: {course.ratingAndReviews.length ? course.ratingAndReviews[0].rating : 'N/A'}</p>
//                         <button
//                             // onClick={() => handleApprove(course._id)}
//                             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                         >
//                             Approve
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default DraftCourse

import React, { useEffect, useState } from 'react';
import { showDraftCourseAPI, approveCourseAPI } from "../service/Operation/AdminAPI";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch } from 'react-redux';


function DraftCourse() {
    const [courses, setCourses] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to fetch draft courses
    async function getData() {
        try {
            const response = await showDraftCourseAPI(token, navigate);
            console.log("Response in getData:", response); // Debugging statement
            // if (response.success) {
            setCourses(response); // Set the fetched data into state
            // } else {
            // console.error("Failed to fetch draft courses:", response.message);
            // }
        } catch (error) {
            console.error("Failed to fetch draft courses:", error);
        }
    }

    // Function to handle course approval
    async function handleApprove(courseId) {
        try {
            console.log("courseId in handleApprove : ", courseId)
            const data = {}
            data.courseId = courseId;
            const response = await approveCourseAPI(data, token, dispatch);
            console.log("token in handleApprove : ", token)
            console.log("Response in handleApprove:", response); // Debugging statement
            if (response.success) {
                // Refresh the data after approval
                getData();
            } else {
                console.error("Failed to approve course:", response.message);
            }
        } catch (error) {
            console.error("Failed to approve course:", error);
        }
    }

    console.log("Courses : ", courses)

    useEffect(() => {
        getData();
    }, [token, navigate]);

    return (
        <div>
            <h1>Draft Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses?.length > 0 ? (
                    courses.map((course) => (
                        <div key={course._id} className="border p-4 rounded-lg shadow-lg">
                            <img src={course.thumbnail} alt={course.courseName} className="w-full h-32 object-cover rounded-t-lg" />
                            <h2 className="text-xl font-semibold mt-2">{course.courseName}</h2>
                            <p className="text-white">Price: <span className='flex'><FaRupeeSign className='mt-1' />{course.price}</span></p>
                            <p className="text-white">Instructor: {course.instructor.firstName} {course.instructor.lastName}</p>
                            <p className="text-white">Status: {course.status}</p>
                            <p className="text-white">Rating: {course.ratingAndReviews.length ? course.ratingAndReviews[0].rating : 'N/A'}</p>
                            <button
                                onClick={() => handleApprove(course?._id)}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>
                        </div>
                    ))
                ) : (
                    <p className='text-white'>No draft courses available.</p>
                )}
            </div>
        </div>
    );
}

export default DraftCourse;
