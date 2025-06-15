import React, { useState, useEffect } from 'react';
import { createSubSection } from '../../../../service/CourseAPI';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from "react-player";
import { updateSubSection } from '../../../../service/CourseAPI'
import { setIsFormVisible } from '../../../../Slices/courseSlice';

const SubsectionForm = ({ sectionId, fetchSubSections, selectedSubSection }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [videoData, setVideoData] = useState({
        title: '',
        timeDuration: '',
        description: '',
        video: null
    });
    const [videoFilePath, setVideoFilePath] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const [response, setResponse] = useState(null);
    // const [isFormVisible, setIsFormVisible] = useState(true);

    const { isFormVisible } = useSelector((state) => state.course);
    // console.log("isFormVisible : ", isFormVisible);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedSubSection) {
            setVideoData({
                title: selectedSubSection.title,
                timeDuration: selectedSubSection.timeDuration,
                description: selectedSubSection.description,
                video: selectedSubSection.video
            });
            setIsUpdating(true);
            dispatch(setIsFormVisible(true));
        } else {
            setVideoData({
                title: '',
                timeDuration: '',
                description: '',
                video: null
            });
            setIsUpdating(false);
            dispatch(setIsFormVisible(false));
        }
    }, [selectedSubSection]);

    const handleVideo = (data) => {
        setVideoData(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // subSectionId, sectionId, title, timeDuration, description
        const formData = new FormData();
        formData.append('subSectionId', selectedSubSection?._id);
        formData.append('sectionId', sectionId);
        formData.append('title', videoData.title);
        formData.append('timeDuration', videoData.timeDuration);
        formData.append('description', videoData.description);

        if (videoData.video) {
            formData.append('video', videoData.video);
        }

        if (isUpdating) {
            // formData.append('subSectionId', selectedSubSection._id);
            await updateSubSection(formData, token);
        } else {
            const subSectionOutput = await createSubSection(formData, token);
            setResponse(subSectionOutput);
            // console.log(subSectionOutput)
        }
        fetchSubSections();
        setVideoData({
            title: '',
            timeDuration: '',
            description: '',
            video: null,
        });
        setIsUpdating(false);
        setResponse(null);
        dispatch(setIsFormVisible(false));
        // setVideoFilePath(null);
    };

    function handleInputChange(event) {
        const { name, value } = event.target;
        setVideoData(prevDta => {
            return ({
                ...prevDta,
                [name]: value,
                // video: file
            })
        });
    }

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // setShowFile(true);
            setVideoFilePath(URL.createObjectURL(file));
            setVideoData(prevData => ({
                ...prevData,
                video: event.target.files[0],
                sectionId: sectionId
            }));

        }
    };

    return (
        <>
            {
                isFormVisible &&
                <form onSubmit={handleSubmit} className='flex flex-col gap-y-2 text-base text-[#b5a8a8]'>
                    <label htmlFor="title">Lecture Title</label>
                    <input type="text"
                        id="title"
                        name='title'
                        value={videoData.title}
                        onChange={handleInputChange}
                        className='w-full py-2 text-opacity-100 text-base mt-4 outline-none border border-richblack-100 text-blue-900 rounded-md'
                    />
                    <br />

                    <label htmlFor="description">Lecture Description</label>
                    <textarea type="text"
                        id="description"
                        name='description'
                        value={videoData.description}
                        onChange={handleInputChange}
                        className='mt-4 w-full py-2 text-opacity-100 outline-none border border-richblack-100 text-base text-blue-900 rounded-md'
                    />
                    <br />
                    <label htmlFor="timeDuration">Time Duration</label>
                    <input type="text"
                        id="timeDuration"
                        name='timeDuration'
                        value={videoData.timeDuration}
                        onChange={handleInputChange}
                        className='mt-4 w-full py-2 text-opacity-100 outline-none border border-richblack-100 text-base text-blue-900 rounded-md'
                    />
                    <br />

                    <div className="flex items-center justify-center w-full ">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <ReactPlayer
                                    url={videoFilePath}
                                    width="100%"
                                    height="55%"
                                    controls={true}
                                    className='object-cover'
                                />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                onChange={handleVideoUpload}
                            />
                        </label>
                    </div>

                    <button
                        type='submit'
                        className='mt-6 py-2 px-6 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 shadow-md self-end'
                    >
                        Submit
                    </button>

                </form>
            }

        </>
    );
};

export default SubsectionForm;

