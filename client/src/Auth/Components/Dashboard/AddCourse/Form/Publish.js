import React, { useState } from 'react'
import { publishCourseAPI } from "../../../../service/CourseAPI"
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function Publish() {

    const [isChecked, setIsChecked] = useState(false)

    const { token } = useSelector((state) => state.auth);
    const { courseId } = useSelector((state) => state.course)

    const navigate = useNavigate();

    const id = localStorage.getItem("courseId")

    console.log("Inside Publish ", "courseId : ", courseId, "token : ", token, " id from localStorage : ", id)

    async function onSubmitHandler(event) {
        event.preventDefault();
        const data = {}
        data.courseId = courseId
        const response = await publishCourseAPI(data, token);
        console.log("response in publish page : ", response);
        if (response?.status === 200) {
            toast.success("Course Published Successfully")
            setIsChecked(true)
            navigate("/dashboard/my-profile");
        }

    }

    const myFunction = () => {
        setIsChecked(!isChecked)
    }


    return (
        <>
            <div className="flex justify-center p-4">
                <form
                    className="bg-blue-700 shadow-lg p-6 rounded-lg w-full max-w-md"
                    onSubmit={onSubmitHandler}
                >
                    <div className="flex items-center gap-x-2 text-lg mb-4">
                        <label htmlFor="course" className="flex-grow">Are you sure you want to publish the course?</label>
                        <input
                            type="checkbox"
                            id="course"
                            name="course"
                            checked={isChecked}
                            onChange={myFunction}
                            className="form-checkbox"
                        />
                    </div>
                    <button
                        id="btn"
                        className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${isChecked ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 cursor-not-allowed opacity-50'}`}
                        type="submit"
                        disabled={!isChecked}
                    >
                        Publish
                    </button>
                </form>
            </div>
        </>
    )
}

export default Publish