import React from 'react';

const Courses = () => {
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>
            <div className="bg-white p-4 rounded shadow">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New Course</button>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Course Name</th>
                            <th className="py-2 px-4 border-b">Instructor</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b">React for Beginners</td>
                            <td className="py-2 px-4 border-b">John Doe</td>
                            <td className="py-2 px-4 border-b">
                                <button className="bg-green-500 text-white px-2 py-1 rounded">Edit</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                            </td>
                        </tr>
                        {/* Add more course rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Courses;
