import React from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../service/CourseAPI'
import { instructorCoursesData } from '../../service/ProfileAPI'
import { useState, useEffect } from 'react'
import Instructorchart from './Instructorchart'
import { Link } from 'react-router-dom'

function InstructorDashboard() {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const [courses, setCourses] = useState([])
    const [courseData, setCourseData] = useState(null)
    const [mostSeelingCourse, setMostSeelingCourse] = useState(null);
    const [amount, setAmount] = useState();
    const [student, setStudent] = useState();

    useEffect(() => {
        const getInstDetails = async () => {
            let totalAmount = 0;
            let noOfStudents = 0;
            try {
                const instrCourse = await fetchInstructorCourses(token);
                // console.log("Instructor Courses : ", instrCourse);
                setCourses(instrCourse)
                const courseData = await instructorCoursesData(token);
                // console.log("Course Data : ", courseData);
                setCourseData(courseData)
                let courseLength = -1;
                let bestSellingCourse = null;
                instrCourse?.forEach((course) => {
                    // console.log("COURSE : ", course);
                    if (course?.studentsEnrolled?.length > courseLength) {
                        courseLength = course?.studentsEnrolled?.length
                        bestSellingCourse = course;
                        totalAmount += course?.price * course?.studentsEnrolled.length;
                        noOfStudents += course?.studentsEnrolled.length;
                    }
                    // console.log("Price : ", course?.price, " Students : ", course?.studentsEnrolled.length)
                    totalAmount = totalAmount + (course?.price * course?.studentsEnrolled.length);
                    noOfStudents += course?.studentsEnrolled.length;
                })
                setMostSeelingCourse(bestSellingCourse);
                // console.log("Total Amount : ", totalAmount, " Students : ", noOfStudents)
                setAmount(totalAmount);
                setStudent(noOfStudents);
            } catch (error) {
                console.log(error);
                console.error("Error fetching instructor details: ", error);
            }
        }
        getInstDetails();
    }, [])

    // console.log("Course data in instructor dashboard : ", courseData)
    // console.log("Courses in instructor dashboard : ", courses)
    // console.log("MostSeelingCourse : ", mostSeelingCourse)
    // console.log("Total Amount : ", totalAmount, " Students : ", noOfStudents)
    return (
        <div className="p-4">
            <p className="text-white text-lg sm:text-xl lg:text-2xl">Hey {user.firstName}</p>
            <p className="text-white text-md sm:text-lg lg:text-xl">Welcome back</p>
            <div className="flex flex-col lg:flex-row justify-between mt-6">
                {/* Chart Section */}
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                    <Instructorchart courses={courseData} />
                </div>

                {/* Stats Section */}
                <div className="w-full lg:w-1/3 text-richblack-5 text-md bg-richblack-800 rounded-lg p-6 shadow-lg">
                    <h1 className="text-lg sm:text-xl font-bold mb-4">Statistics</h1>
                    <div className="space-y-2">
                        <p className="text-sm sm:text-md">No Of Students Enrolled:</p>
                        <p className="text-lg sm:text-xl font-semibold">{student}</p>
                        <p className="text-sm sm:text-md">Total Amount:</p>
                        <p className="text-lg sm:text-xl font-semibold">₹ {amount}</p>
                        <p className="text-sm sm:text-md">Total Courses:</p>
                        <p className="text-lg sm:text-xl font-semibold">{courses?.length}</p>

                        {/* Best Selling Course */}
                        <br />
                        <div className="bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm w-full mx-auto flex flex-col">
                            <h2 className="text-white text-lg font-semibold mb-4">Most Selling Course</h2>
                            {mostSeelingCourse ? (
                                <div className="flex flex-col items-center space-y-4">
                                    {/* Course Thumbnail */}
                                    <img
                                        src={mostSeelingCourse.thumbnail}
                                        alt={mostSeelingCourse.title}
                                        className="w-full h-28 object-cover rounded-lg shadow-md"
                                    />

                                    {/* Course Details */}
                                    <div className="text-white space-y-2 text-center">
                                        <h3 className="text-md sm:text-lg font-semibold">{mostSeelingCourse.title}</h3>
                                        <p className="text-sm sm:text-md">Students Enrolled: {mostSeelingCourse.studentsEnrolled.length}</p>
                                        <p className="text-sm sm:text-md">Total Amount: ₹ {mostSeelingCourse.price * mostSeelingCourse.studentsEnrolled.length}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-400">No course data available.</p>
                            )}
                        </div>


                    </div>
                </div>
            </div>
            <div className="rounded-md bg-richblack-800 p-6 mt-5">
                {/* Render 3 courses */}
                <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                    <Link to="/dashboard/my-courses">
                        <p className="text-xs font-semibold text-yellow-50">View All</p>
                    </Link>
                </div>
                <div className="my-4 flex items-start space-x-6">
                    {courses.slice(0, 3).map((course) => (
                        <div key={course._id} className="w-1/3">
                            <img
                                src={course.thumbnail}
                                alt={course.courseName}
                                className="h-[201px] w-full rounded-md object-cover"
                            />
                            <div className="mt-3 w-full">
                                <p className="text-sm font-medium text-richblack-50">
                                    {course.courseName}
                                </p>
                                <div className="mt-1 flex items-center space-x-2">
                                    <p className="text-xs font-medium text-richblack-300">
                                        {course.studentsEnrolled.length} students
                                    </p>
                                    <p className="text-xs font-medium text-richblack-300">
                                        |
                                    </p>
                                    <p className="text-xs font-medium text-richblack-300">
                                        Rs. {course.price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InstructorDashboard