import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fileUpload } from '../../service/FileUpload';
import { useDispatch } from 'react-redux';
import countriesData from '../../data/countrycode.json'
import { updateAdditionalData } from '../../service/SettingAPI'

function Setting() {

    const [formData, setFormData] = useState({
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        country: "",
        countryName: "",
        about: ""
    })

    const [image, setImage] = useState(null);

    const { user } = useSelector((state) => state.profile)

    console.log("user in setting : ", user);

    // console.log("user in setting : ", user)
    // console.log("userid in setting : ", user._id)

    const id = user._id;
    const { token } = useSelector((state) => state.auth);

    console.log("token inside setting : ", token)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changehandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("form data in submit handler : ", formData)
        let { gender, contactNumber, country, dateOfBirth, about } = formData;
        let formattedContactNumber = `${country}-${contactNumber}`;
        // console.log("formattedContactNumber : ", formattedContactNumber)
        contactNumber = formattedContactNumber
        // console.log("Updated contactNumber : ", contactNumber)
        const response = await dispatch(updateAdditionalData(gender, contactNumber, dateOfBirth, about, token))
        // console.log("Response for adiitional details inside setting : ", response)
    }

    const selectFileHandler = (event) => {
        // console.log("File : ", file);
        // setFile(event.target.files[0]);
        // console.log("File : ", file);

        const selectedFile = event.target.files[0];
        console.log("Selected File: ", selectedFile);
        setImage(selectedFile);  // Update file state with the selected file
        // Now you can see the correct file value
        console.log("selectedFile : ", selectedFile)
    }

    const uploadHandler = async () => {
        const formData = new FormData();
        formData.append('displayimage', image)
        //     console.log("file in uploadHandler : ", file)
        //     console.log("type of file : ", typeof (file))
        // console.log("type of image : ", typeof (image))
        // console.log("image in uploadHandler : ", image)
        // console.log("user id in uploadHandler : ", id)
        const response = await dispatch(fileUpload(id, formData, token))
        // console.log("response inside setting : ", response)
    }

    if (user === null) return null;

    return (
        <div>
            <h1 className='text-blue-25 text-lg font-semibold'>Edit Profile</h1>
            <div className='mt-14 flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
                <div className='flex flex-col gap-y-4'>
                    <img src={user?.image} alt="user-image" className='w-8 h-8 rounded-full shadow-lg' />
                    <p className='text-blue-5 text-pretty text-base'>To change profile picture first click select then upload..</p>
                    <div className='gap-x-4 flex'>
                        {/* <input type="file"
                            name="file"
                            id='file'
                            value={setFile(file)}
                            onChange={selectFileHandler}
                            className='text-white text-opacity-45 px-4 py-1 border-richblack-600 bg-richblack-400 rounded-md'
                        /> */}

                        <input onChange={selectFileHandler}
                            type="file"
                            name="file"
                            id="file"
                            // value={file}
                            className='text-white text-opacity-45 px-4 py-1 border-richblack-600 bg-richblack-400 rounded-md'
                        />

                        {/* <button onClick={selectFileHandler}
                            className='text-white text-opacity-45 px-4 py-1 border-richblack-600 bg-richblack-400 rounded-md'
                        >
                            Select
                        </button> */}
                        <button onClick={uploadHandler}
                            className='text-white text-opacity-45 px-4 py-1 border-richblack-600 bg-richblack-400 rounded-md'
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>

            {/* Additional Details */}

            <div className='flex flex-col max-w-[75%] justify-between mt-14 items-center text-white rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
                <h2 className='text-base font-bold'>Add Personl details</h2>
                <form onSubmit={submitHandler}
                    className='flex flex-col w-[100%] p-20 shadow-lg m-0 gap-y-2'
                >
                    <label htmlFor="dob" className='ml-4 text-start'> Date Of Birth</label>
                    <input type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={changehandler}
                        className='border border-gray-300 border-b-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none bg-richblack-700 text-brown-5'
                    />
                    <br />

                    <label htmlFor="Gender" className='ml-4 text-start'>Gender </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={changehandler}
                        // className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        className='border border-gray-300  border-b-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none bg-richblack-700 text-brown-5'
                    >
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                    <br />


                    <label htmlFor="contact-number" className='ml-4 text-start'>
                        <div className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.4rem]'>
                            Contact Number
                            <sup className='text-pink-200 text-[1rem]'>*</sup>
                        </div>
                    </label>
                    <div className='flex gap-x-[0.001rem]'>
                        <select
                            required
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={changehandler}
                            // className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            className='border border-gray-300  border-b-blue-300 focus:border-blue-400 w-[25%] ml-4 p-2 rounded-md outline-none bg-richblack-700 text-brown-5'
                        >
                            <option value="">Select...</option>
                            {
                                countriesData.map((data, key) => {
                                    return <option key={key} value={data.code}>{data.country}</option>
                                })
                            }

                        </select>
                        <input type="text"
                            required
                            name='contactNumber'
                            id='contactNumber'
                            value={formData.contactNumber}
                            onChange={changehandler}
                            placeholder='Enter Contact number'
                            className='border border-gray-300 border-b-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none bg-richblack-700 text-brown-5'
                            pattern="[0-9]{10}"  // Pattern for exactly 10 digits
                            title="Please enter exactly 10 digits"  // Error message if pattern doesn't match
                        />
                    </div>
                    <br />

                    <label htmlFor="about" className='ml-4 text-start'> About </label>
                    <input type="text"
                        name='about'
                        id='about'
                        value={formData.about}
                        onChange={changehandler}
                        placeholder='Enter about yourself'
                        className='border border-gray-300  border-b-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none bg-richblack-700'
                    />
                    <br />


                    <div className='mt-4 ml-4 flex gap-x-4'>
                        <button type='submit'
                            className='rounded-md text-sm font-normal px-4 py-1 bg-richblack-200 text-blue-5'
                        >
                            Save
                        </button>
                        <button
                            className='rounded-md text-sm font-normal px-4 py-1 bg-richblack-200 text-blue-5'
                            onClick={() => navigate("/dashboard/my-profile")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Setting