import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCourse } from '../../Slices/courseSlice';
import { getUserEnrolledCourses } from '../../service/UserCourseAPI';
import { setCompletedLectures, updateCompletedLectures } from '../../Slices/viewCourseSlice';

function VideoSideBar() {
    const [courses, setCourses] = useState(null);
    const { courseId } = useParams();
    const course = courses?.find((course) => course._id === courseId);

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { completedLectures = [] } = useSelector((state) => state.viewCourse);

    const getAllEnrolledCourse = async () => {
        try {
            const response = await getUserEnrolledCourses(token, dispatch);
            setCourses(response);
            dispatch(setCourse(response));
        } catch (e) {
            console.log("Can't get all enrolled course details", e);
        }
    };

    useEffect(() => {
        if (courses === null) {
            getAllEnrolledCourse();
        }
    }, [courses]);

    useEffect(() => {
        if (completedLectures.length === 0) {
            const storedCompletedLect = localStorage.getItem("completedLect");
            if (storedCompletedLect) {
                const updatedLectures = (storedCompletedLect);
                dispatch(setCompletedLectures(updatedLectures));
            }
        }
    }, [completedLectures, dispatch]);

    const navigate = useNavigate();
    const [visibleSections, setVisibleSections] = useState({});
    const [videoBarActive, setVideoBarActive] = useState("");

    const toggleVisibility = (sectionId) => {
        setVisibleSections((prevState) => ({
            ...prevState,
            [sectionId]: !prevState[sectionId],
        }));
    };

    console.log("courses : ", courses)

    return (
        <div className='flex h-[calc(100vh-3.5rem)] min-w-[18rem] flex-col border-r-[1px] border-r-richblack-500 py-10'>
            <div className='flex flex-col items-center justify-center gap-5 text-white text-center'>
                <h1 className='text-base font-semibold'>Video</h1>
                <div className='w-full px-4'>
                    {course?.courseContent?.map((section) => (
                        <div key={section._id} className='mb-4'>
                            <div
                                className='flex items-center justify-between cursor-pointer p-2 bg-richblack-700 rounded-lg'
                                onClick={() => toggleVisibility(section._id)}
                            >
                                <h1 className='text-base font-semibold'>{section?.sectionName}</h1>
                                <span className='text-lg'>
                                    {visibleSections[section._id] ? '▲' : '▼'}
                                </span>
                            </div>
                            {visibleSections[section._id] && (
                                <div className='ml-4 mt-2'>
                                    {section.subSection?.map((sub) => (
                                        <div key={sub._id}
                                            className={`flex gap-3  px-5 py-2 ${videoBarActive === sub._id
                                                ? "bg-yellow-200 font-semibold text-richblack-800"
                                                : "hover:bg-richblack-900"
                                                }`}
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${course?._id}/section/${section?._id}/sub-section/${sub?._id}`
                                                );
                                                setVideoBarActive(sub._id);
                                            }}
                                        >
                                            <input type="checkbox"
                                                className="w-4 h-4 text-gray-600 bg-gray-100 rounded border-gray-200 focus:ring-blue-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                checked={completedLectures.includes(sub._id)}
                                                onChange={() => { }}
                                            />
                                            {sub.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VideoSideBar;
