import React from 'react'
import { Link } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from '../../Auth/ProfileDropDown'
import { apiConnector } from '../../service/apiConnector'
import { categories } from '../../service/apis'
import { useState } from 'react'
import { useEffect } from 'react'
import logo from '../../assets/logo.png'
import { setCatagory } from '../../Slices/courseSlice'
import ShowNotifications from './Notification/ShowNotifications'
import { setCategory } from '../../Slices/categorySlice'


function NavBar() {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)
    console.log("total item in cart : ", totalItems)

    console.log("user in navbar : ", user)
    console.log("user in navbar : ", user?.accountType)

    const location = useLocation();
    const dispatch = useDispatch();

    const [subLinks, setSubLinks] = useState(null);

    async function fetchSubLinks() {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API)
            console.log("Result in fetchSubLinks in navbar : ", result)
            console.log("SubLinks : ", result.data.data)
            setSubLinks(result.data.data)
            dispatch(setCategory(result.data.data))
        } catch (error) {
            console.log("Links can not fetched from backend")
            console.log(error)
        }
    }

    console.log("Data : ", subLinks)

    dispatch(setCatagory(subLinks))

    useEffect(() => {
        fetchSubLinks()
    }, []);


    // dispatch(setCatagory(result.data.data))

    // return (
    //     <div className='flex h-14 border-1 border-b-caribbeangreen-5'>
    //         <div className='flex w-11/12 max-w-maxContent items-center justify-around mt-2'>
    //             <div className='ml-8'>
    //                 <Link to="/">
    //                     <img src={logo} alt="logo" loading='lazy' className='h-10 w-10 rounded-full' />
    //                 </Link>
    //             </div>
    //             <nav>
    //                 <ul className='flex items-center text-richblack-400 gap-x-4 '>
    //                     {
    //                         NavbarLinks.map((link, index) => {
    //                             return (
    //                                 <li key={index} >
    //                                     {
    //                                         link.title === "Catalog" ? (
    //                                             <div className='group relative flex cursor-pointer items-center gap-1'>
    //                                                 Course
    //                                                 <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-white/30 backdrop-blur-lg shadow-lg p-4 text-richblack-900 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
    //                                                     {subLinks?.length > 0 ?
    //                                                         subLinks.map((data, index) => {
    //                                                             return (
    //                                                                 <Link to={`/catagory/${data.name.split(" ").join("-").toLowerCase()}`} key={index} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
    //                                                                 >
    //                                                                     {data.name}
    //                                                                 </Link>
    //                                                             )
    //                                                         }) :
    //                                                         (<div>No Courses Till Created.</div>)
    //                                                     }
    //                                                 </div>
    //                                             </div>
    //                                         ) : (
    //                                             <Link to={link.path}>
    //                                                 <p className={location.pathname === link.path ? 'text-yellow-25' : 'text-pure-greys-200'}>
    //                                                     {link.title}
    //                                                 </p>
    //                                             </Link>
    //                                         )
    //                                     }
    //                                 </li>
    //                             )
    //                         })
    //                     }
    //                 </ul>
    //             </nav>

    //             {/* login/signup/dashboard */}
    //             <div className='hidden items-center gap-x-8 md:flex'>
    //                 {/* show cart */}
    //                 {
    //                     user && user?.accountType !== "Instructor" && (
    //                         <Link to="/dashboard/cart" className='relative'>
    //                             <IoCartOutline className='text-2xl text-richblack-100 translate-x-56' />
    //                             {
    //                                 totalItems > 0 && (
    //                                     <span className='absolute -bottom-0 -translate-y-3 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
    //                                         {totalItems}
    //                                     </span>
    //                                 )
    //                             }
    //                         </Link>
    //                     )
    //                 }
    //                 {
    //                     token === null && (
    //                         <Link to="/login">
    //                             <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>LogIn</button>
    //                         </Link>
    //                     )
    //                 }
    //                 {
    //                     token === null && (
    //                         <Link to="/signUp">
    //                             <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>SignUp</button>
    //                         </Link>
    //                     )
    //                 }
    //                 {
    //                     token !== null && (
    //                         <ProfileDropDown />
    //                     )
    //                 }
    //                 {
    //                     token !== null && user?.accountType !== "Admin" && (
    //                         // <Notifications />
    //                         <ShowNotifications />
    //                     )
    //                 }

    //             </div>

    //         </div>
    //     </div>
    // )




    return (
        <div className="flex h-14 border-b-[1px] border-b-[#00cc88] bg-richblack-700 ">
            <div className="flex w-11/12 max-w-maxContent items-center justify-between mx-auto">
                {/* Logo */}
                <div className="ml-8">
                    <Link to="/">
                        <img src={logo} alt="logo" loading="lazy" className="h-10 w-10 rounded-full" />
                    </Link>
                </div>

                {/* Navbar Links */}
                <nav>
                    <ul className="flex items-center text-richblack-400 gap-x-6">
                        {NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <div className="group relative flex cursor-pointer items-center gap-1 text-pure-greys-200 hover:text-yellow-100 transition-colors">
                                        Course
                                        <div className="invisible absolute left-[50%] top-[100%] z-[1000] flex w-[200px] -translate-x-1/2 translate-y-4 flex-col rounded-lg bg-white/30 backdrop-blur-lg shadow-lg p-4 text-richblack-900 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100 lg:w-[300px]">
                                            {subLinks?.length > 0 ? (
                                                subLinks.map((data, index) => (
                                                    <Link
                                                        to={`/catagory/${data.name.split(" ").join("-").toLowerCase()}`}
                                                        key={index}
                                                        className="block rounded-lg bg-transparent py-2 px-3 text-richblack-800 hover:bg-richblack-50 hover:text-richblack-900"
                                                    >
                                                        {data.name}
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="text-center text-sm text-gray-500">
                                                    No Courses Created Yet.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={link.path}>
                                        <p
                                            className={`transition-colors ${location.pathname === link.path
                                                ? "text-yellow-25"
                                                : "text-pure-greys-200 hover:text-yellow-100"
                                                }`}
                                        >
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Login/Signup/Dashboard */}
                <div className='flex flex-row space-x-6'>
                    <div className="hidden md:flex flex-row space-x-6">
                        {/* Show Cart */}
                        {user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <IoCartOutline className="text-2xl text-richblack-100" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )}
                        {/* Login/Signup Buttons */}
                        {token === null && (
                            <>
                                <Link to="/login">
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700">
                                        LogIn
                                    </button>
                                </Link>
                                <Link to="/signUp">
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700">
                                        SignUp
                                    </button>
                                </Link>
                            </>
                        )}
                        {/* Profile Dropdown and Notifications */}
                        {token !== null && (
                            <>
                                <ProfileDropDown />
                                {user?.accountType !== "Admin" && <ShowNotifications />}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default NavBar