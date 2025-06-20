import React from 'react';
import { getAllUser } from '../service/Operation/AdminAPI';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';


const UsersInAdminPage = () => {
    const { token } = useSelector(state => state.auth);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const response = await getAllUser(token);
                setUsers(response?.users);
                console.log("Response : ", response);
            } catch (error) {
                console.error(error);
                toast.error("Can't access all user data right now")
            }
        }
        fetchAllUser();
    }, []);

    console.log("Users : ", users);
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <div className="bg-white p-4 rounded shadow">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">User Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Role</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map((user, indx) => {
                                return (
                                    <tr key={indx}>
                                        <td className="py-2 px-4 border-b">{user.firstName} {user.lastName}</td>
                                        <td className="py-2 px-4 border-b">{user.email}</td>
                                        <td className="py-2 px-4 border-b">{user.accountType}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button className="bg-green-500 text-green px-2 py-1 rounded">Edit</button>
                                            <button className="bg-red-500 text-red px-2 py-1 rounded ml-2">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersInAdminPage;