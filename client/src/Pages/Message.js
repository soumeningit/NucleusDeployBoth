import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    createMessageAPI,
    createReply,
    getAllQuestionsAPI,
    getReply,
} from '../service/Operation/CommentAPI';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaTelegramPlane } from 'react-icons/fa';
import { ExtractTimeAndDate } from '../Utils/ExtractTimeAndDate';

function Message() {
    const { courseId, sectionId, subSectionId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const userImage = user?.image;
    const [allQuestions, setAllQuestions] = useState([]);
    const [visibility, setVisibility] = useState({});
    const [replyMessage, setReplyMessage] = useState([]);
    const [question, setQuestion] = useState('');
    const [reply, setReply] = useState('');

    useEffect(() => {
        async function fetchQuestions() {
            const resp = await getAllQuestionsAPI(token);
            setAllQuestions(resp);
        }
        if (token) fetchQuestions();
    }, [token]);

    const toggleReplies = async (qId) => {
        setVisibility((v) => ({ ...v, [qId]: !v[qId] }));
        if (!visibility[qId]) {
            const resp = await getReply({ courseId, sectionId, subSectionId, questionId: qId }, token);
            setReplyMessage((prev) => ({ ...prev, [qId]: resp || [] }));
        }
    };

    const submitQuestion = async () => {
        await createMessageAPI({ courseId, sectionId, subSectionId, message: question }, token);
        setQuestion('');
    };

    const submitReply = async (qId) => {
        await createReply({ courseId, sectionId, subSectionId, message: reply, questionId: qId }, token);
        setReply('');
    };

    return (
        <div className="bg-gray-50 p-6 space-y-8">
            {allQuestions.length ? (
                allQuestions.map((q) => (
                    <div key={q._id} className="max-w-3xl mx-auto space-y-2">
                        {/* Question */}
                        <div className="flex flex-col md:flex-row bg-white p-4 rounded shadow">
                            <img
                                src={q.userId.image}
                                alt="User"
                                className="w-12 h-12 rounded-full mr-4 mb-4 md:mb-0"
                            />
                            <div>
                                <h4 className="font-semibold">{q.content}</h4>
                                <p className="text-sm text-gray-500">{q.userId.firstName} {q.userId.lastName}</p>
                            </div>
                        </div>

                        {/* Toggle Comments */}
                        <div
                            className="flex items-center cursor-pointer text-blue-600"
                            onClick={() => toggleReplies(q._id)}
                        >
                            {visibility[q._id] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            <span className="ml-2">Comments</span>
                        </div>

                        {/* Replies */}
                        {visibility[q._id] && (
                            <div className="space-y-4 ml-8">
                                {(replyMessage[q._id] || []).map((r) => (
                                    <div key={r._id} className="flex flex-col md:flex-row bg-white p-4 rounded shadow">
                                        <img
                                            src={r.userId.image}
                                            alt="User"
                                            className="w-10 h-10 rounded-full mr-4 mb-2 md:mb-0"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between text-sm text-gray-500 mb-1">
                                                <span>{r.userId.firstName} {r.userId.lastName}</span>
                                                <span>{ExtractTimeAndDate(r.createdAt)}</span>
                                            </div>
                                            <p className="font-medium">{r.reply}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Reply Input */}
                                {/* {user?.accountType === 'Instructor' && (
                                    <div className="flex items-start space-x-4 bg-white p-4 rounded shadow">
                                        <img
                                            src={userImage}
                                            alt="You"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <textarea
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                            placeholder="Write your reply..."
                                            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            rows={2}
                                        />
                                        <button
                                            onClick={() => submitReply(q._id)}
                                            className="text-blue-600 p-2 rounded hover:bg-blue-100"
                                        >
                                            <FaTelegramPlane size={20} />
                                        </button>
                                    </div>
                                )} */}

                                <div className="flex items-start space-x-4 bg-white p-4 rounded shadow">
                                    <img
                                        src={userImage}
                                        alt="You"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <textarea
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        placeholder="Write your reply..."
                                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        rows={2}
                                    />
                                    <button
                                        onClick={() => submitReply(q._id)}
                                        className="text-blue-600 p-2 rounded hover:bg-blue-100"
                                    >
                                        <FaTelegramPlane size={20} />
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No questions yet.</p>
            )}

            {/* Ask a New Question */}
            <div className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-2">
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={3}
                />
                <button
                    onClick={submitQuestion}
                    className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
                >
                    <FaTelegramPlane className="mr-2 text-lg" /> Ask
                </button>
            </div>
        </div>
    );
}

export default Message;
