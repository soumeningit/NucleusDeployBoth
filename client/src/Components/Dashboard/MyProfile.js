import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserDetailsById } from '../../service/ProfileAPI';
import { setUser } from '../../Slices/profileSlice';

function MyProfile() {

    const navigate = useNavigate();
    const userDetails = useSelector((state) => state.profile.user)
    // console.log("user : ", user)

    const { token } = useSelector((state) => state.auth);

    const userId = useParams().id || userDetails?._id;
    console.log("userId : ", userId);

    const [user, setUserDetails] = useState();

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await getUserDetailsById(token, userId);
                console.log("response : " + response);
                console.log("response : " + JSON.stringify(response));
                if (response?.data?.success) {
                    setUserDetails(response?.data?.data);
                    setUser(response?.data?.data);
                } else {
                    console.error("Failed to fetch user details:", response.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (!user) {
            getUserDetails();
        }
    }, []);

    console.log("user : " + JSON.stringify(user));


    return (
        <>
            <h1 className='mb-14 text-lg font-bold text-white'>My Profile</h1>

            {/* Section - 1 */}
            <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>

                <div className='flex items-center gap-4'>
                    <img src={user?.image} alt="user-image" className='aspect-square w-8 h-8 rounded-full shadow-md' />
                    <div className='flex flex-col text-white text-base font-medium space-y-1'>
                        <p>{user?.firstName} {user?.lastName}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate("/dashboard/settings")}
                    className='text-white text-md font-semibold px-2 py-1 bg-brown-50 rounded-md hover:bg-brown-100 hover:scale-100 transition-all'
                >
                    Edit
                </button>

            </div>

            {/* Section - 2 */}

            <div className='mt-14 flex items-center text-white justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
                <div className='flex flex-col gap-y-4 font-inter'>
                    <h2 className='text-bold text-justify text-base'>About</h2>
                    <p>{user?.additionalDetails?.about ?? "No information .please insert about yourself"}</p>
                </div>
                <button onClick={() => navigate("/dashboard/settings")}>
                    Edit
                </button>

            </div >

            {/* Section - 3 */}

            <div className="flex max-w-[55%] justify-between mt-14 items-center text-white rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

                <div className="flex flex-col gap-y-5">

                    <div>
                        <p className="mb-2 text-sm text-richblack-600">First Name</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.firstName}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Email</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.email}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Gender</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.additionalDetails?.gender ?? "Add Gender"}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-y-5">
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.lastName}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {(user?.additionalDetails?.dateOfBirth) ??
                                "Add Date Of Birth"}
                        </p>
                    </div>
                </div>

                <div>
                    <button
                        className='bg-richblack-600 text-white font-medium rounded-md px-4 py-2 ml-8'
                        onClick={() => navigate("/dashboard/settings")}
                    >
                        Edit
                    </button>
                </div>
            </div>


        </>


    )
}

export default MyProfile