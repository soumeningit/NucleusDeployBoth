// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMessage } from "../../../service/Operation/AdminAPI"
// import { FaBell } from 'react-icons/fa';

// const NotificationList = ({ notifications }) => {
//     return (
//         <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4">
//             {notifications?.length === 0 ? (
//                 <p className="text-gray-500">No notifications</p>
//             ) : (
//                 <ul>
//                     {notifications.map(notification => (
//                         <li key={notification._id} className="border-b last:border-b-0 py-2">
//                             <p>{notification.message}</p>
//                             <small className="text-gray-500">{new Date(notification.createdAt).toLocaleString()}</small>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// const ShowNotifications = () => {
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [notifications, setNotifications] = useState([]);
//     const [unreadCount, setUnreadCount] = useState(0);

//     const { token } = useSelector((state) => state.auth);
//     const user = useSelector((state) => state.profile.user);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {

//                 // const data = {};
//                 // data.user = user;
//                 console.log("data im fetch notifications : ", user);
//                 const response = await getMessage(user, token, dispatch);
//                 console.log("response inside fetchNotifications : ", response);
//                 setNotifications(response);
//                 const unread = response?.filter(notification => !notification.isRead).length;
//                 setUnreadCount(unread);
//             } catch (error) {
//                 console.error("Failed to fetch notifications", error);
//             }
//         };

//         fetchNotifications();
//     }, []);

//     const toggleNotifications = () => {
//         setShowNotifications(!showNotifications);
//     };

//     return (
//         <div className="relative">
//             <button onClick={toggleNotifications}>
//                 <FaBell size={24} />
//                 {unreadCount > 0 && (
//                     <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                         {unreadCount}
//                     </span>
//                 )}
//             </button>
//             {showNotifications && <NotificationList notifications={notifications} />}
//         </div>
//     );
// };

// export default ShowNotifications;







// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMessage } from "../../../service/Operation/AdminAPI";
// import { FaBell } from 'react-icons/fa';

// const NotificationList = ({ notifications }) => {
//     return (
//         <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4">
//             {notifications?.length === 0 ? (
//                 <p className="text-gray-500">No notifications</p>
//             ) : (
//                 <ul>
//                     {notifications.map(notification => (
//                         <li key={notification._id} className="border-b last:border-b-0 py-2">
//                             <p>{notification.message}</p>
//                             <small className="text-gray-500">{new Date(notification.createdAt).toLocaleString()}</small>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// const ShowNotifications = () => {
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [notifications, setNotifications] = useState([]);
//     const [unreadCount, setUnreadCount] = useState(0);

//     const { token } = useSelector((state) => state.auth);
//     const user = useSelector((state) => state.profile.user);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 console.log("Fetching notifications for user:", user);
//                 const response = await getMessage(user, token, dispatch);
//                 console.log("Notifications fetched:", response);

//                 setNotifications(response);
//                 const unread = response?.filter(notification => !notification.isRead).length;
//                 setUnreadCount(unread);
//             } catch (error) {
//                 console.error("Failed to fetch notifications", error);
//             }
//         };

//         fetchNotifications();
//     }, [user, token, dispatch]);

//     const toggleNotifications = () => {
//         setShowNotifications(!showNotifications);
//     };

//     return (
//         <div className="relative">
//             <button onClick={toggleNotifications}>
//                 <FaBell size={24} />
//                 {unreadCount > 0 && (
//                     <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                         {unreadCount}
//                     </span>
//                 )}
//             </button>
//             {showNotifications && <NotificationList notifications={notifications} />}
//         </div>
//     );
// };

// export default ShowNotifications;









import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage } from "../../../service/Operation/AdminAPI";
import { FaBell } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const NotificationList = ({ notifications, closeModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
            <div className="relative w-96 max-w-full bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-4 shadow-lg">
                <button className="absolute top-2 right-2 text-gray-700" onClick={closeModal}>
                    <IoClose size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4 text-white">Notifications</h2>
                {notifications.length === 0 ? (
                    <p className="text-gray-500 text-center">No notifications</p>
                ) : (
                    <ul className="space-y-4">
                        {notifications.map(notification => (
                            <li key={notification._id} className="border-b last:border-b-0 pb-2">
                                <p className='text-white'>{notification?.title ?? "Title"}</p>
                                <p className="text-white">{notification.message}</p>
                                <small className="text-gray-300">{new Date(notification.createdAt).toLocaleString()}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const ShowNotifications = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const { token } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.profile.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getMessage(user, token, dispatch);
                console.log("Notifications fetched:", response);
                setNotifications(response);
                const unread = response?.filter(notification => !notification.isRead).length;
                setUnreadCount(unread);
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            }
        };

        fetchNotifications();
    }, [user, token, dispatch]);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
            markAllAsRead();
        }
    };

    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            isRead: true
        }));
        setNotifications(updatedNotifications);
        setUnreadCount(0);
        // Optionally, send a request to the server to mark notifications as read
    };

    return (
        <div className="relative ">
            <button onClick={toggleNotifications}>
                <FaBell size={24} />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>
            {showNotifications && <NotificationList notifications={notifications} closeModal={toggleNotifications} />}
        </div>
    );
};

export default ShowNotifications;
