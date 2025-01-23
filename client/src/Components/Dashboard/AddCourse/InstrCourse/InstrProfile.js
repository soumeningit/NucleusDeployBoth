// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// function InstrProfile() {

//     const { user } = useSelector((state) => state.profile)
//     console.log("user : ", user)

//     const navigate = useNavigate();

//     return (
//         <>
//             <h1 className='mb-14 text-lg font-bold text-white' > My Profile</ h1>

//             {/* Section - 1 */}
//             <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>

//                 <div className='flex items-center gap-4'>
//                     <img src={user?.image} alt="user-image" className='aspect-square w-8 h-8 rounded-full shadow-md' />
//                     <div className='flex flex-col text-white text-base font-medium space-y-1'>
//                         <p>{user?.firstName} {user?.lastName}</p>
//                         <p>{user?.email}</p>
//                     </div>
//                 </div>
//                 <button
//                     onClick={() => navigate("/dashboard/settings")}
//                     className='text-white text-md font-semibold px-2 py-1 bg-brown-50'
//                 >
//                     Edit
//                 </button>

//             </div>

//             {/* Section - 2 */}

//             <div className='mt-14 flex items-center text-white justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
//                 <div className='flex flex-col gap-y-4 font-inter'>
//                     <h2 className='text-bold text-justify text-base'>About</h2>
//                     <p>{user?.additionalDetails?.about ?? "No information .please insert about yourself"}</p>
//                 </div>
//                 <button onClick={() => navigate("/dashboard/settings")}>
//                     Edit
//                 </button>

//             </div >

//             {/* Section - 3 */}

//             <div className="flex max-w-[55%] justify-between mt-14 items-center text-white rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

//                 <div className="flex flex-col gap-y-5">

//                     <div>
//                         <p className="mb-2 text-sm text-richblack-600">First Name</p>
//                         <p className="text-sm font-medium text-richblack-5">
//                             {user?.firstName}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="mb-2 text-sm text-richblack-600">Email</p>
//                         <p className="text-sm font-medium text-richblack-5">
//                             {user?.email}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="mb-2 text-sm text-richblack-600">Gender</p>
//                         <p className="text-sm font-medium text-richblack-5">
//                             {user?.additionalDetails?.gender ?? "Add Gender"}
//                         </p>
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-y-5">
//                     <div>
//                         <p className="mb-2 text-sm text-richblack-600">Last Name</p>
//                         <p className="text-sm font-medium text-richblack-5">
//                             {user?.lastName}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
//                         <p className="text-sm font-medium text-richblack-5">
//                             {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
//                         <p className="text-sm font-medium text-richblack-5">
//                             {(user?.additionalDetails?.dateOfBirth) ??
//                                 "Add Date Of Birth"}
//                         </p>
//                     </div>
//                 </div>

//                 <div>
//                     <button
//                         className='bg-richblack-600 text-white font-medium rounded-md px-4 py-2 ml-8'
//                         onClick={() => navigate("/dashboard/settings")}
//                     >
//                         Edit
//                     </button>
//                 </div>
//             </div>


//         </>


//     )
// }

// export default InstrProfile








import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

import { setCourse, setEditCourse } from '../../../../Slices/courseSlice'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { ExtractTimeAndDate } from "../../../../Utils/ExtractTimeAndDate"

// import { formatDate } from "../../../../services/formatDate"
import {
    deleteCourse,
    fetchInstructorCourses,
} from "../../../../service/CourseAPI";

// import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../Common/ConfirmationModal"

export default function CoursesTable() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        // const result = await fetchInstructorCourses(token)
        // if (result) {
        //     setCourses(result)
        // }
        setConfirmationModal(null)
        setLoading(false)
    }

    const { courses } = useSelector((state) => state.course);

    async function fetchCourse() {
        try {
            const response = await fetchInstructorCourses(token);
            console.log("response in fetchCourse : ", response)
            if (response) {
                dispatch(setCourse(response))
            }
            // setConfirmationModal(null)
            setLoading(false)
        } catch (e) {
            console.log("Instructor fetchCourse failed .....: ", e)
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCourse()
    }, [])

    // console.log("All Course ", courses)

    return (
        <>
            <Table className="rounded-xl border border-richblack-800 ">
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Courses
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Duration
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Price
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {courses?.length === 0 ? (
                        <Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                No courses found
                                {/* TODO: Need to change this state */}
                            </Td>
                        </Tr>
                    ) : (
                        courses?.map((course) => (
                            <Tr
                                key={course._id}
                                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                            >
                                <Td className="flex flex-1 gap-x-4">
                                    <img
                                        src={course?.thumbnail}
                                        alt={course?.courseName}
                                        className="h-[148px] w-[220px] rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col justify-between">
                                        <p className="text-lg font-semibold text-richblack-5">
                                            {course.courseName}
                                        </p>
                                        <p className="text-xs text-richblack-300">
                                            {course.courseDescription.split(" ").length >
                                                TRUNCATE_LENGTH
                                                ? course.courseDescription
                                                    .split(" ")
                                                    .slice(0, TRUNCATE_LENGTH)
                                                    .join(" ") + "..."
                                                : course.courseDescription}
                                        </p>
                                        <p className="text-[12px] text-white">
                                            Created: {ExtractTimeAndDate(course.createdAt)}
                                        </p>
                                        {course.status === "Draft" ? (
                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                <HiClock size={14} />
                                                Drafted
                                            </p>
                                        ) : (
                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                    <FaCheck size={8} />
                                                </div>
                                                Published
                                            </p>
                                        )}
                                    </div>
                                </Td>
                                <Td className="text-sm font-medium text-richblack-100">

                                </Td>
                                <Td className="text-sm font-medium text-richblack-100">
                                    ₹{course.price}
                                </Td>
                                <Td className="text-sm font-medium text-richblack-100 ">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            navigate(`/dashboard/edit-course/${course._id}`)
                                        }}
                                        title="Edit"
                                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                    >
                                        <FiEdit2 size={20} />
                                    </button>
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course?",
                                                text2:
                                                    "All the data related to this course will be deleted",
                                                btn1Text: !loading ? "Delete" : "Loading...  ",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading
                                                    ? () => handleCourseDelete(course._id)
                                                    : () => { },
                                                btn2Handler: !loading
                                                    ? () => setConfirmationModal(null)
                                                    : () => { },
                                            })
                                        }}
                                        title="Delete"
                                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}