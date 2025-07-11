import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCartItems } from '../../service/UserCourseAPI';
import { LiaRupeeSignSolid } from "react-icons/lia";
import toast from 'react-hot-toast';
import { deleteFromCartAPI } from '../../service/Operation/CartAPI';
import { buyCourse } from '../../service/Operation/PaymentAPI';

function CartItem() {

    const { token } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const { loading } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.profile);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [courses, setCourses] = useState(null);

    const fetchCartItems = async () => {
        try {
            const response = await getCartItems(token, dispatch);
            setCourses(response);
        } catch (error) {
            console.log("Calling API Error : ", error)
        }
    }

    useEffect(() => {
        fetchCartItems();
    }, [token, dispatch]);

    async function deleteItemHandler(courseId) {

        try {
            const response = await deleteFromCartAPI([courseId], token)
            setCourses(courses.filter(course => course._id !== courseId));
            toast.success("Course Removed From Cart Successfully")
        } catch (e) {
            console.log("Error in deleting item : ", e)
        }
    }

    let coursesId = []
    const checkoutHandler = () => {
        if (courses?.length > 0) {
            for (let i = 0; i < courses?.length; i++) {
                coursesId.push(courses[i]._id)
            }

            if (token) {
                try {
                    const response = buyCourse(token, coursesId, user, navigate, dispatch);
                }
                catch (e) {
                    console.log("Error in buyCourse from cart : ", e)
                }
            }
        }
        else {
            toast.error("Cart is Empty.")
        }
    }

    function calculatePrice() {
        let price = 0;
        for (let i = 0; i < courses?.length; i++) {
            price += courses[i].price;
        }
        return price;
    }

    let noOfItems = courses?.length;

    localStorage.setItem("totalItems", courses?.length ?? 0)


    return (
        <div className='bg-[rgba(31,41,55,255)] relative overflow-hidden'>
            <div>
                <div className='text-4xl text-richblack-50 mx-auto mt-4 translate-x-80'>Cart Items</div>
                {loading ? (
                    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <div className="spinner"></div>
                    </div>
                ) : (

                    <div className="flex flex-col text-blue-5 max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800">
                        {
                            courses && courses?.map((course, index) => {
                                return (
                                    <ul className="flex flex-col divide-y dark:divide-gray-300" key={index}>
                                        <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                                            <div className="flex w-full space-x-2 sm:space-x-4">
                                                <img className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                                                    src={course?.thumbnail} alt={`Course Thumbnail ${index}`} loading='lazy' />
                                                <div className="flex flex-col justify-between w-full pb-4">
                                                    <div className="flex justify-between w-full pb-2 space-x-2">
                                                        <div className="space-y-1">
                                                            <h3 className="text-lg font-semibold leading-snug sm:pr-8">{course?.courseName}</h3>
                                                            <p className="text-sm dark:text-gray-600">{course?.courseDescription}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-semibold flex">
                                                                <LiaRupeeSignSolid className='mt-1 text-xl font-extrabold' />
                                                                {course?.price}
                                                            </p>
                                                            <p className="flex text-lg line-through dark:text-gray-400 mt-4">
                                                                <LiaRupeeSignSolid className='mt-1 text-xl font-extrabold' />
                                                                {course?.price + 5000}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex text-sm divide-x">
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                const courseId = course?._id;
                                                                deleteItemHandler(courseId);
                                                            }}
                                                            type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                                <rect width="32" height="200" x="168" y="216"></rect>
                                                                <rect width="32" height="200" x="240" y="216"></rect>
                                                                <rect width="32" height="200" x="312" y="216"></rect>
                                                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                                            </svg>
                                                            <span>Remove</span>
                                                        </button>
                                                        <button type="button" className="flex items-center px-2 py-1 space-x-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                                <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                                            </svg>
                                                            <span>Add to favorites</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                )
                            })
                        }
                        <div className="space-y-1 text-right">
                            <p className='translate-x-3/4 font-semibold text-lg flex'>Total amount:
                                <span className="font-semibold text-lg flex">
                                    <LiaRupeeSignSolid className='mt-1 text-xl font-extrabold' />
                                    {calculatePrice()}
                                </span>
                            </p>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => navigate("/dashboard/enrolled-courses")}
                                type="button"
                                className="px-6 py-2 border rounded-md dark:border-violet-600"
                            >
                                Back
                                <span className="sr-only sm:not-sr-only">to Study</span>
                            </button>
                            <button onClick={(event) => {
                                event.preventDefault();
                                checkoutHandler();
                            }}
                                type="button" className="px-6 py-2 border rounded-md dark:bg-violet-600 dark:text-gray-50 dark:border-violet-600">
                                <span className="sr-only sm:not-sr-only">Continue to</span>Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div >
    )
}

export default CartItem