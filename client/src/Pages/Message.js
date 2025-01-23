import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createMessageAPI, createReply, getAllQuestionsAPI, getReply } from '../service/Operation/CommentAPI';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { ExtractTimeAndDate } from '../Utils/ExtractTimeAndDate';

function Message() {

    const [replymessage, setReplyMessage] = useState(null);
    const [allQuestions, setAllQuestions] = useState([]);
    const [question, setQuestion] = useState('');
    const [reply, setReply] = useState(null);

    const getAllQuestions = async () => {
        const response = await getAllQuestionsAPI(token);
        // console.log("allQuestionsresponse : " + JSON.stringify(response));
        setAllQuestions(response);
    }

    console.log("All Questions  : ", allQuestions)

    useEffect(() => {
        getAllQuestions();
    }, [])
    const dispatch = useDispatch();

    const { courseId, sectionId, subSectionId } = useParams();
    const [visibility, setVisibility] = useState({});

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const userImage = user?.image;

    async function submitQuestionHandler() {
        const data = {}
        data.courseId = courseId;
        data.sectionId = sectionId;
        data.subSectionId = subSectionId;
        data.message = question;

        try {
            const messageSubmitResponse = await createMessageAPI(data, token);
            console.log("messageSubmitResponse : ", messageSubmitResponse)
        } catch (e) {
            console.log("Message Submit Failed : ", e);
        }
    }

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    }

    const toggleRepliesVisibility = (questionId) => {
        console.log("questionId : ", questionId)
        setVisibility(prevState => ({
            // ...prevState,
            [questionId]: !prevState[questionId]
        }));
    };

    console.log("Reply : ", reply);

    async function submitReplyHandler(questionId) {
        const data = {}
        data.courseId = courseId;
        data.sectionId = sectionId;
        data.subSectionId = subSectionId;
        data.message = reply;
        data.questionId = questionId;
        console.log("data : ", data)
        try {
            const replySubmitResponse = await createReply(data, token);
            console.log("replySubmitResponse : ", replySubmitResponse)
        } catch (e) {
            console.log("Reply Submit Failed : ", e);
        }
    }

    async function replyHandler(questionId) {
        const data = {}
        data.sectionId = sectionId;
        data.subSectionId = subSectionId;
        data.questionId = questionId;
        console.log("dta in replyHandler: ", data)

        try {
            const response = await getReply(data, token);
            console.log("response in reply handler : ", response);
            setReplyMessage(response);
        } catch (e) {
            console.log("Reply Submit Failed : ", e);
        }

    }

    console.log("replymessage : ", replymessage)

    return (
        <>
            <div className='p-6 w-full mx-auto bg-white rounded-xl shadow-md space-y-4 overflow-hidden'>
                {allQuestions.length > 0 ? (
                    allQuestions.map((data, index) => {
                        return (
                            <>
                                <div className='flex flex-col mx-auto max-w-[50rem] md:flex-row w-full p-4 border border-[#e7e4e4] rounded-lg'>
                                    <div className='md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0'>
                                        <img src={data?.userId?.image} className='w-12 h-12 rounded-full border border-[#f1f1f1] z-20' loading="lazy" />
                                    </div>
                                    <div className='md:w-2/3 flex flex-col justify-center'>
                                        <h1 className='text-lg font-semibold'>{data?.content}</h1>
                                        <h2 className='text-sm text-[#969494d7]'>{data?.userId?.firstName} {data?.userId?.lastName}</h2>
                                    </div>
                                </div>
                                <div className='flex items-center space-x-2 translate-x-48 overflow-x-hidden'>
                                    {visibility[data?._id]
                                        ? <IoIosArrowUp className='cursor-pointer text-xl' onClick={() => toggleRepliesVisibility(data?._id)} />
                                        : <IoIosArrowDown className='cursor-pointer text-xl' onClick={() => {
                                            toggleRepliesVisibility(data?._id)
                                            console.log("questionId in get comment : ", data?._id)
                                            replyHandler(data?._id);
                                        }} />
                                    }
                                    <span>Comments</span>
                                </div>
                                {visibility[data?._id] && (
                                    <div className='mt-4 mx-auto'>
                                        {/* Replies content goes here. */}
                                        {
                                            replymessage?.length > 0 &&
                                            replymessage?.map((reply, index) => {
                                                return (
                                                    <div className='flex flex-col md:flex-row w-full p-4 border border-[#e7e4e4] rounded-lg translate-x-4'>
                                                        <div className='md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0'>
                                                            <img src={reply?.userId?.image} className='w-12 h-12 rounded-full border border-[#f1f1f1] z-20' loading="lazy" />
                                                        </div>
                                                        <div className='md:w-2/3 flex flex-col justify-center'>
                                                            <div className='flex flex-row justify-between'>
                                                                <h2 className='text-sm text-[#969494d7]'>{reply?.userId?.firstName} {reply?.userId?.lastName}</h2>
                                                                <span>{ExtractTimeAndDate(reply?.createdAt)}</span>
                                                            </div>
                                                            <h1 className='text-lg font-semibold'>{reply?.reply}</h1>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )
                                        }
                                        {/* Cretae your comment */}
                                        <div className='w-full max-w-[50rem] mx-auto'>
                                            <label htmlFor="reply" className='block text-sm font-semibold text-gray-700'>Your Answer </label>
                                            <div className='flex flex-row space-x-4 translate-x-7'>
                                                <img src={userImage} alt="user-img" className='w-12 h-12 rounded-full border border-[#f1f1f1] z-20 mb-4' loading="lazy" />
                                                <textarea
                                                    required
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    type="textarea"
                                                    placeholder='Your Reply'
                                                    id="reply"
                                                    name="reply"
                                                    value={reply}
                                                    onChange={(event) => setReply(event.target.value)}
                                                />
                                                <div className='w-12 h-12 rounded-full bg-[white] translate-y-3 '>
                                                    <FaTelegramPlane className="cursor-pointer px-2 py-1 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#562977] text-3xl rounded-full"
                                                        onClick={() => {
                                                            console.log("dataId : ", data?._id)
                                                            // setQuestionId(data?._id)
                                                            submitReplyHandler(data?._id)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )
                    })
                ) : (
                    <p>No Comment Created till now!</p>
                )
                }
                {/* Ask a new Question */}
                <div className='p-6 max-w-[30rem] w-full mx-auto rounded-xl shadow-md space-y-4'>
                    <label htmlFor="question" className='block text-sm font-semibold text-gray-700'>Ask a new Question</label>
                    <div className='flex flex-row space-x-4'>
                        <textarea
                            required
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="textarea"
                            id="question"
                            name="question"
                            value={question}
                            onChange={handleQuestionChange}
                        />
                        <div className='w-12 h-12 rounded-full bg-[white] translate-y-3 '>
                            <FaTelegramPlane className="cursor-pointer px-2 py-1 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#562977] text-3xl rounded-full"
                                onClick={submitQuestionHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Message;

