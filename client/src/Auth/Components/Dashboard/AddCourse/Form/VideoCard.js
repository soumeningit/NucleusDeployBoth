import React, { useState, useRef } from 'react'
import './UploadFileCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from '../../../../Slices/courseSlice';
import ReactPlayer from "react-player";


function VideoCard({ handleVideo, sectionId }) {

    console.log("inside....")

    // const [videoData, setVideoData] = useState({
    //     video: null,
    //     lectTitle: "",
    //     lectDesc: "",
    //     timeduration: ""
    // })

    const [videoData, setVideoData] = useState({
        sectionId: null, title: "", timeDuration: "", description: "", video: null
    });

    // const { isOpen } = useSelector((state) => state.course)

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const [showFile, setShowFile] = useState(false);
    const [videoFilePath, setVideoFilePath] = useState(null);
    // const [videoFile, setVideoFile] = useState(null);
    const fileInputRef = useRef(null);
    // const [refresh, setRefresh] = useState(false);

    function handleCloseBtn() {
        // dispatch(setIsOpen(false))
        setIsOpen(false)
    }

    // const handleVideoUpload = (event) => {
    //     // setShowFile(true)
    //     const file = event.target.files[0]
    //     if (file) {
    //         console.log("file : ", file)
    //         setShowFile(true)
    //         setVideoFile()
    //         setVideoFilePath(URL.createObjectURL(event.target.files[0]));
    //     }
    // };


    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("file : ", file);
            setShowFile(true);
            setVideoFilePath(URL.createObjectURL(file));
            setVideoData(prevData => ({
                ...prevData,
                video: event.target.files[0],
                sectionId: sectionId
            }));
        }
    };

    console.log("video in videocard : ", videoData.video);

    const handleSpanClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleClear = () => {
        setVideoFilePath(null);
        setVideoData(null)
        setShowFile(false)
        // setRefresh(prevRefresh => !prevRefresh);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

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

    console.log("videoData in VideoCArd : ", videoData)


    console.log("videoFilePath : ", videoFilePath)

    // videoData["videoFile"] = video;

    function submitHandler(event) {
        event.preventDefault();
        console.log("videoData : ", videoData)
        handleVideo(videoData)
    }

    for (const key in videoData) {
        if (videoData.hasOwnProperty(key)) {
            console.log(`${key}: ${videoData[key]}`);
        }
    }

    return (
        <>
            {
                isOpen &&
                <div className="modal">
                    <div className="modal-header">
                        <div className="modal-logo">
                            <span className="logo-circle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 512 419.116"
                                >
                                    <defs>
                                        <clipPath id="clip-folder-new">
                                            <rect width="512" height="419.116"></rect>
                                        </clipPath>
                                    </defs>
                                    <g id="folder-new" clipPath="url(#clip-folder-new)">
                                        <path
                                            id="Union_1"
                                            data-name="Union 1"
                                            d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z"
                                            fill="var(--c-action-primary)"
                                            stroke=""
                                            strokeWidth="1"
                                        ></path>
                                    </g>
                                </svg>
                            </span>
                        </div>
                        <button onClick={handleCloseBtn}
                            className="btn-close">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path
                                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                                    fill="var(--c-text-secondary)"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p className="modal-title">Upload a file</p>
                        <p className="modal-description">Attach the file below</p>
                        <div className="upload-area">
                            <ReactPlayer url={videoFilePath} width="100%" height="100%" controls={true} />
                            {!showFile &&
                                <>
                                    <span onClick={handleSpanClick} className="upload-area-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="35"
                                            height="35"
                                            viewBox="0 0 340.531 419.116"
                                        >
                                            <g id="files-new" clipPath="url(#clip-files-new)">
                                                <path
                                                    id="Union_2"
                                                    data-name="Union 2"
                                                    d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                                                    transform="translate(2944 428)"
                                                    fill="var(--c-action-primary)"
                                                ></path>
                                            </g>
                                        </svg>
                                    </span>
                                    <span className="upload-area-title">.</span>
                                    <span style={{ cursor: 'pointer', color: 'blue' }}
                                    >
                                        Uploaded file
                                        <br /><strong>shown here</strong>

                                    </span>
                                </>
                            }

                        </div>
                    </div>
                    <div className="modal-footer ">
                        <input className=''
                            name="video"
                            // value={videoData.video}
                            type="file"
                            onChange={handleVideoUpload}
                            accept="video/*"
                            multiple={false}
                            ref={fileInputRef}
                        />
                        <button
                            onClick={handleClear}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                    <form onSubmit={submitHandler}>
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

                        <button
                            className='px-2 py-1 bg-richblack-50 text-blue-50 rounded-md text-base'
                            type='submit'
                        >
                            Submit
                        </button>
                    </form>

                </div>
            }
        </>
    )


}
export default VideoCard











// import React, { useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setIsOpen } from '../../../../Slices/courseSlice'; // Import your redux action

// function VideoCard({ handleVideo,sectionId }) {

//     console.log("inside....");

//     // const [videoData, setVideoData] = useState({
//     //     video: null,
//     //     lectTitle: "",
//     //     lectDesc: "",
//     //     timeduration: ""
//     // });
//     const [videoData, setVideoData] = useState({
//         sectionId, title:"", timeDuration:"", description:"",video:null
//     });

//     const { isOpen } = useSelector((state) => state.course);

//     const dispatch = useDispatch();

//     const [showFile, setShowFile] = useState(false);
//     const [videoFilePath, setVideoFilePath] = useState(null);
//     const fileInputRef = useRef(null);

//     function handleCloseBtn() {
//         dispatch(setIsOpen(false));
//     }

//     const handleVideoUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             console.log("file : ", file);
//             setShowFile(true);
//             setVideoFilePath(URL.createObjectURL(file));
//             setVideoData(prevData => ({
//                 ...prevData,
//                 video: file
//             }));
//         }
//     };

//     const handleSpanClick = () => {
//         fileInputRef.current.click(); // Trigger file input click
//     };

//     const handleClear = () => {
//         setVideoFilePath(null);
//         setVideoData({
//             video: null,
//             lectTitle: "",
//             lectDesc: "",
//             timeduration: ""
//         });
//         setShowFile(false);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     function handleInputChange(event) {
//         const { name, value } = event.target;
//         setVideoData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     }

//     function submitHandler(event) {
//         event.preventDefault();
//         console.log("videoData : ", videoData);
//         handleVideo(videoData);
//     }

//     console.log("videoData in VideoCard : ", videoData);
//     console.log("videoFilePath : ", videoFilePath);

//     return (
//         <div>
//             {isOpen && (
//                 <div>
//                     <button onClick={handleCloseBtn}>Close</button>
//                     <form onSubmit={submitHandler}>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="lectTitle"
//                                 placeholder="Lecture Title"
//                                 value={videoData.lectTitle}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="lectDesc"
//                                 placeholder="Lecture Description"
//                                 value={videoData.lectDesc}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="timeduration"
//                                 placeholder="Time Duration"
//                                 value={videoData.timeduration}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="file"
//                                 ref={fileInputRef}
//                                 onChange={handleVideoUpload}
//                                 style={{ display: 'none' }}
//                             />
//                             <span onClick={handleSpanClick}>Upload Video</span>
//                             {showFile && (
//                                 <div>
//                                     <video src={videoFilePath} controls width="250"></video>
//                                     <button type="button" onClick={handleClear}>Clear</button>
//                                 </div>
//                             )}
//                         </div>
//                         <button type="submit">Submit</button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default VideoCard;
