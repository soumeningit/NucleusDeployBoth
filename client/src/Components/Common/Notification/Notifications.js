import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import ShowNotifications from './ShowNotifications';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/api/notifications');
                setNotifications(response.data);
                const unread = response.data.filter(notification => !notification.isRead).length;
                setUnreadCount(unread);
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="relative">
            <FaBell size={24} />
            {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                </span>
            )}
            {/* <ShowNotifications /> */}
        </div>
    );
};

export default Notifications;
