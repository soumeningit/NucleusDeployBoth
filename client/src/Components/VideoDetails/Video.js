import React from 'react';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import 'video-react/dist/video-react.css';
import { LoadingSpinner, Player, ControlBar, PlaybackRateMenuButton, BigPlayButton, ReplayControl, ForwardControl } from 'video-react';
import './Player.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateCompletedLectures } from '../../Slices/viewCourseSlice';
import { setLoading } from '../../Slices/courseSlice';
import { courseProgressAPI } from '../../service/Operation/VideoApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Video() {
    const playerRef = useRef(null);
    const [isEnded, setIsEnded] = useState(false);
    const [videoURL, setVideoURL] = useState("");
    const { courses } = useSelector((state) => state.course);
    const { courseId, sectionId, subSectionId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const { completedLectures = [] } = useSelector((state) => state.viewCourse);

    const navigate = useNavigate();


    const dispatch = useDispatch();

    useEffect(() => {

        const course = courses?.find((course) => course._id === courseId)
        const section = course?.courseContent?.find(function (section) {
            return section._id === sectionId
        })
        const subSection = section?.subSection?.find((subSection) => subSection._id === subSectionId)

        setIsEnded(false);

        setVideoURL(subSection?.videoUrl)
    }, [sectionId, subSectionId, courses])

    const handleReplay = () => {
        const player = playerRef.current;
        player.seek(0);
        player.play();
        setIsEnded(false);
    };

    const handleMarkAsComplete = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await courseProgressAPI({ courseId: courseId, subSectionId: subSectionId }, token);
            if (res) {
                dispatch(updateCompletedLectures(subSectionId));
                localStorage.setItem("completedLect", res?.data?.data?.completedVideos)
            }
            else {
                toast.success("Course already marked as completed")
            }
        } catch (e) {
            console.log("error in handleMarkAsComplete : ", e)
        }
        setLoading(false);
        setIsEnded(false);
    }

    return (
        <>
            <div className='player-wrapper relative '>
                <Player
                    ref={playerRef}
                    poster=""
                    src={videoURL}
                    className="react-player"
                    autoPlay
                    width="100%"
                    height="80%"
                    controls={false}
                    onEnded={() => setIsEnded(true)}
                >
                    <LoadingSpinner />
                    <BigPlayButton position="center" />
                    <ControlBar autoHide={true} className="my-class">
                        <PlaybackRateMenuButton rates={[0.5, 1, 1.25, 1.5, 2]} />
                        <ReplayControl seconds={10} order={2.2} />
                        <ForwardControl seconds={10} order={3.2} />
                    </ControlBar>
                </Player>

                {isEnded && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        color: 'white',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        padding: '15px',
                        borderRadius: '5px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center',

                    }}
                    >
                        <button
                            onClick={handleReplay}
                            style={{
                                backgroundColor: '#4CAF50', /* Green */
                                border: 'none',
                                color: 'white',
                                padding: '10px 20px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                display: 'inline-block',
                                fontSize: '16px',
                                margin: '4px 2px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                transitionDuration: '0.4s',
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                        >
                            Replay
                        </button>
                        {
                            !completedLectures.includes(subSectionId) &&
                            <button
                                onClick={handleMarkAsComplete}
                                style={{
                                    backgroundColor: '#008CBA',
                                    border: 'none',
                                    color: 'white',
                                    padding: '10px 20px',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    fontSize: '16px',
                                    margin: '4px 2px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    transitionDuration: '0.4s',
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#007bb5'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#008CBA'}
                            >
                                Mark as Completed
                            </button>
                        }
                        {/* <button
                        className='bg-blue-500 text-white py-2 px-4 text-center inline-block text-base m-1 cursor-pointer rounded transition duration-400 hover:bg-blue-700'
                    >
                        Next
                    </button> */}
                    </div>
                )}

            </div >

            <div className='flex mx-auto justify-center text-white'>
                <div>Description</div>
                <button
                    className='bg-blue-500 text-white py-2 px-4 text-center inline-block text-base m-1 cursor-pointer rounded transition duration-400 hover:bg-blue-700'
                    onClick={() => {
                        navigate(
                            `/view-course/${courseId}/section/${sectionId}/sub-section/${subSectionId}/question-answer`
                        );
                    }
                    }
                >
                    Q&A
                </button>
            </div>
        </>
    );
}

export default Video;