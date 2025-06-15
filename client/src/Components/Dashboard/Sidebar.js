import React, { useState } from 'react'
import { getSidebarLinks, sidebarLinks } from '../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import { useDispatch, useSelector } from 'react-redux';
import { VscSignOut } from "react-icons/vsc";
import { logout } from '../../service/authAPI';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../Slices/authSlice';
import { setUser } from '../../Slices/profileSlice';

function Sidebar() {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);

    const { token } = useSelector((state) => state.auth);

    const [showConfirm, setShowConfirm] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log("user : ", user)
    // const token = user?.token;

    const handleLogout = () => {
        try {
            logout(token, navigate, setToken, setUser, dispatch);
        } catch (error) {
            console.error(error);
        }
    }


    if (profileLoading || authLoading) {
        return (
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <div className="spinner"></div>
            </div>
        )
    }

    const sidebarLinks = getSidebarLinks(user?._id);

    // console.log("sidebarLinks : ", sidebarLinks)

    return (
        <>
            <div className='flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link) => {

                            if (link.type && link.type !== user?.accountType) {
                                return null
                            }

                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )

                        })
                    }
                </div>
                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
                <div className="flex flex-col">
                    <SidebarLink
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />
                    <div>
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="px-8 py-2 text-sm font-medium text-richblack-300"
                        >
                            <div className="flex items-center gap-x-2">
                                <VscSignOut className="text-lg" />
                                <span>Logout</span>
                            </div>
                        </button>
                        {showConfirm && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-8 rounded shadow-lg text-center">
                                    <p className="mb-4">Are you sure you want to log out?</p>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 mr-2 text-sm font-medium text-richblack-300 bg-red-500 rounded"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => setShowConfirm(false)}
                                        className="px-4 py-2 text-sm font-medium text-richblack-300 bg-gray-500 rounded"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar