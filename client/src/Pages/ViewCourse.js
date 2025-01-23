import React from 'react'
import VideoSideBar from '../Components/VideoDetails/VideoSideBar'
import CourseReview from '../Components/VideoDetails/CourseReview'
import { Outlet } from 'react-router-dom'

function ViewCourse() {
    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-[#bab8b8]">
            <VideoSideBar />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="w-full py-2">
                    <Outlet />
                </div>
            </div>
            {/* <CourseReview /> */}
        </div>
    )
}

export default ViewCourse