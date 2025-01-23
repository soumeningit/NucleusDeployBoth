import React from 'react'
import { useLocation } from 'react-router-dom'

function AllCourses() {
    const location = useLocation();
    const allCourses = location.state.allCourses || {};
    console.log("All Courses : ", allCourses);
    return (
        <div className='mx-auto px-4 py-8'>
            <h2 className='font-bold text-xl'>All the skills you need in one place</h2>
            <p className='text-md'>From critical skills to technical topics, Udemy supports your professional development.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    allCourses?.map((course, indx) => {
                        return (
                            <div key={indx} className="bg-white rounded-lg shadow-md p-4">
                                <img src={course?.thumbnail} alt={course?.courseName} className="w-full h-40 object-cover rounded-lg mb-4" />
                                <span className="text-lg font-bold flex felx-row">
                                    <img src={course?.instructor?.image} alt="instructor-image" className='h-6 w-6 rounded-full mr-2' /> {course?.instructor?.firstName} {course?.instructor?.lastName}
                                </span>
                                <h2 className="text-lg font-bold">{course?.courseName}</h2>
                                <p className="text-md">{course?.description}</p>
                                <p>Price : ₹{course?.price}</p>
                                <p>Students : {course?.studentsEnrolled.length}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllCourses