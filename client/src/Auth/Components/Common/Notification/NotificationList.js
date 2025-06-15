import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationList = ({ notifications }) => {
    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`/api/notifications/${notificationId}`, { isRead: true });
            // Optionally update local state to reflect the change
        } catch (error) {
            console.error("Failed to mark notification as read", error);
        }
    };

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4">
            {notifications.length === 0 ? (
                <p className="text-gray-500">No notifications</p>
            ) : (
                <ul>
                    {notifications.map(notification => (
                        <li key={notification._id} className="border-b last:border-b-0 py-2">
                            <p>{notification.message}</p>
                            <small className="text-gray-500">{new Date(notification.createdAt).toLocaleString()}</small>
                            {!notification.isRead && (
                                <button
                                    onClick={() => markAsRead(notification._id)}
                                    className="text-blue-500 text-sm"
                                >
                                    Mark as read
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationList;
