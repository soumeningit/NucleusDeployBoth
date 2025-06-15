import React from 'react';

const Analytics = () => {
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-xl font-semibold">New Users</h3>
                    <p className="text-gray-600">120</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-xl font-semibold">Courses Completed</h3>
                    <p className="text-gray-600">320</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-xl font-semibold">Revenue</h3>
                    <p className="text-gray-600">$50,000</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
