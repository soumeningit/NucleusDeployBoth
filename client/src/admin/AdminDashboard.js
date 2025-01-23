import React from 'react';
import Notifications from './Notifications';
import FormValidation from './FormValidation';

const AdminDashboard = () => {
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-xl font-semibold">Total Courses</h3>
                    <p className="text-gray-600">50</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-xl font-semibold">Total Users</h3>
                    <p className="text-gray-600">1500</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-xl font-semibold">Monthly Revenue</h3>
                    <p className="text-gray-600">$10,000</p>
                </div>
                {/* <FormValidation /> */}
            </div>
        </div>
    );
};

export default AdminDashboard;
