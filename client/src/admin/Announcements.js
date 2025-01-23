// import React, { useState } from 'react';

// const Announcements = () => {
//     const [announcement, setAnnouncement] = useState('');

//     const handleSendAnnouncement = () => {
//         // Logic to send the announcement
//         console.log('Announcement sent:', announcement);
//         setAnnouncement('');
//     };

//     return (
//         <div className="p-8">
//             <h2 className="text-2xl font-bold mb-4">Announcements</h2>
//             <div className="bg-white p-4 rounded shadow">
//                 <textarea
//                     className="w-full p-2 border rounded mb-4"
//                     rows="5"
//                     placeholder="Write your announcement here..."
//                     value={announcement}
//                     onChange={(e) => setAnnouncement(e.target.value)}
//                 ></textarea>
//                 <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                     onClick={handleSendAnnouncement}
//                 >
//                     Send Announcement
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Announcements;






import React, { useState } from 'react';
import { createMessage } from '../service/Operation/AdminAPI'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createNotificationAPI } from '../service/Operation/AdminAPI';

const CreateAnnouncement = () => {

    const { token } = useSelector((state) => state.auth);

    console.log("Token in adminAnnouncement : ", token);

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // { title, message }
            const data = {};
            data.title = title;
            data.message = message;
            console.log("Data inside announcement : ", data);

            const createMessageResponse = await createMessage(data, token, dispatch);
            console.log("createMessageResponse : ", createMessageResponse);
            const createNotificationResponse = await createNotificationAPI(data, token, dispatch);
            console.log("createNotificationResponse in admin announcement : ", createNotificationResponse);

            setTitle('');
            setMessage('');

        } catch (error) {
            console.error("Failed to create announcement", error);
        }
        setLoading(false);
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Create Announcement</h2>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="4"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Announcement'}
                </button>
            </form>
        </div>
    );
};

export default CreateAnnouncement;
