import { useState } from 'react'
import { useSelector } from 'react-redux';
import { addCourseDetails } from '../../../../service/CourseAPI'
import { useDispatch } from 'react-redux';

const initialFromData = {
    courseTitle: "",
    about: "",
    price: "",
    catagory: "",
    iptag: "",
    tags: [],
    thumbnail: null,
    benifit: "",
    benefits: [],
    requirement: "",
    requirements: [],
    status: ""
}

function CourseInfo() {

    const { token } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    let [fromData, setFromData] = useState(initialFromData)

    const [tag, setTag] = useState([]);

    const [temp, setTemp] = useState([]);

    const [benefitInput, setBenefitInput] = useState([]);

    const catagories = useSelector((state) => state?.course.catagory);

    function changeHandeler(event) {
        const { name, value } = event.target;
        setFromData(prevDta => {
            return ({
                ...prevDta,
                [name]: value
            }
            )
        });
    }

    const addTag = (event) => {
        const trimmedValue = fromData.iptag.trim();
        if (trimmedValue && !tag.includes(trimmedValue)) {
            const newTags = [...tag, trimmedValue]
            setTag(newTags);
            setFromData(prevData => ({
                ...prevData,
                iptag: "",
                tags: newTags
            }));
        }
    }

    const handleAddBenefit = (e) => {
        e.preventDefault();
        const trimmedValue = fromData.benifit.trim();
        if (trimmedValue && !benefitInput.includes(trimmedValue)) {
            const newBenefits = [...benefitInput, trimmedValue]
            setBenefitInput(newBenefits);
            setFromData((prevState) => ({
                ...prevState,
                benifit: "",
                benefits: newBenefits
            }));
        }
    };


    const addRequirements = (event) => {
        event.preventDefault();
        const trimmedValue = fromData.requirement.trim();
        if (trimmedValue && !temp.includes(trimmedValue)) {
            const newTempDta = [...temp, trimmedValue]
            setTemp(newTempDta);
            setFromData(prevData => ({
                ...prevData,
                requirement: "",
                requirements: newTempDta
            }));
        }
    }

    const handleKeyDown = (event) => {
        // event.preventDefault();
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault()
            addTag();
        }
    }

    const removeTag = (indextoremove) => {
        setTag(tag.filter((_, index) => index !== indextoremove));
    }

    const removerequirements = (indextoremove) => {
        setTemp(temp.filter((_, index) => index !== indextoremove));
    };

    const handleRemoveBenefit = (indexToRemove) => {
        setBenefitInput(benefitInput.filter((_, idx) => idx !== indexToRemove)); // return a new array which pass the condition
    }

    const handleImgUpload = (event) => {
        setFromData(prevData => ({
            ...prevData,
            thumbnail: event.target.files[0]
        }))
    }

    async function submitHandler(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('courseName', fromData.courseTitle);
        formData.append('courseDescription', fromData.about);
        formData.append('whatYouWillLearn', JSON.stringify(fromData.benefits));
        formData.append('price', fromData.price);
        formData.append('tag', JSON.stringify(fromData.tags));
        formData.append('category', fromData.catagory);
        formData.append('instructions', JSON.stringify(fromData.requirements));
        formData.append('status', fromData.status);
        formData.append('thumbnailImage', fromData.thumbnail);

        <div className='spinner'></div>
        try {
            const response = await addCourseDetails(formData, token, dispatch)
            // console.log("response after form submit: ", response)

            setFromData(initialFromData);
        } catch (error) {
            console.log("Course API connection failed.")
            console.log(error)
        }

    }

    return (
        <>
            <h4 className='text-xl text-richblack-5'>CourseInfo</h4>
            <div className='flex flex-col text-richblue-700 items-center mt-2 max-w-[11/12] mx-auto gap-y-4 border-none'>

                <form onSubmit={submitHandler} className='w-full p-20 shadow-lg m-0 gap-y-4 '>

                    <label htmlFor="courseTitle" className='text-white relative ml-4 text-start'>Course Title <sup className='absolute text-[#ea3737] mt-8 -translate-x-4 -translate-y-8 font-bold text-xl left-[6.4rem]'>*</sup></label> <br />
                    <input type="text"
                        required
                        placeholder="Enter Course Title"
                        name='courseTitle'
                        id='courseTitle'
                        onChange={changeHandeler}
                        value={fromData.courseTitle}
                        className='border border-gray-300 border-b-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none mb-4'
                    />
                    <br />

                    <label htmlFor="about" className='text-white ml-4 text-start'>Course Short Descriptopn</label> <br />
                    <textarea type="text"
                        required
                        name='about'
                        placeholder='About Course'
                        onChange={changeHandeler}
                        id='about'
                        value={fromData.about}
                        className='border border-gray-300 border-t-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none mb-4'
                    />
                    <br />

                    <label htmlFor="price" className='text-white ml-4 text-start'>Course Price</label> <br />
                    <input
                        type="text"
                        placeholder="Course Price"
                        name='price'
                        id='price'
                        required
                        onChange={changeHandeler}
                        value={fromData.price}
                        className='border border-gray-300 border-t-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none mb-4'
                    />
                    <br />

                    <label htmlFor="catagory" className='text-white ml-4 text-start'> Choose Ctagory</label> <br />
                    <select name="catagory"
                        id="catagory"
                        required
                        onChange={changeHandeler}
                        value={fromData.catagory}

                        className='border bg-richblue-500 border-gray-300 text-white border-t-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none mb-4'
                    >
                        <option value="" disabled>Choose a catagory.</option>

                        {
                            catagories?.map((data, index) => {
                                return (
                                    <option required key={index} value={data._id}>
                                        {data.name}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <br />
                    <label htmlFor="iptag" className='text-white ml-4 text-start'>Create Tag</label> <br />
                    <div className='flex flex-wrap mb-4'>
                        {
                            tag && tag.map((data, indx) => {
                                return (
                                    <div key={indx}
                                        className='flex items-center bg-blue-800 text-[#e3dddd] rounded-full px-3 py-1 mr-2 mb-2'
                                    >
                                        {data}
                                        <button
                                            type="button"
                                            className="ml-2 text-[yellow] focus:outline-none"
                                            onClick={() => removeTag(indx)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <input type="text"
                        placeholder='Hit Enter or press , to insert tag'
                        value={fromData.iptag}
                        name='iptag'
                        id='iptag'
                        onChange={changeHandeler}
                        onKeyDown={handleKeyDown}
                        className='border border-gray-300  border-b-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none mb-4'
                    />

                    {/* Thumbnail upload */}

                    <label htmlFor="thumbnail" className='text-white ml-4 text-start'>Course Thumbnail</label> <br />
                    <input
                        required
                        type="file"
                        name="myImage"
                        onChange={handleImgUpload}
                        className='border border-gray-300 text-white border-b-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none mb-4'
                    />

                    <br />

                    <label htmlFor="benifit" className='text-white ml-4 text-start'>Benefits</label>
                    <br />
                    <div className='flex flex-wrap mb-4'>
                        {benefitInput && benefitInput.map((benefit, index) => (
                            <div key={index} className='flex items-center bg-blue-800 text-[#e3dddd] rounded-full px-3 py-1 mr-2 mb-2'>
                                {benefit}
                                <button
                                    type="button"
                                    className="ml-2 text-[yellow] focus:outline-none"
                                    onClick={() => handleRemoveBenefit(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Enter Benefit"
                        name="benifit"
                        id='benifit'
                        value={fromData.benifit}
                        onChange={changeHandeler}
                        className='border border-gray-300  border-b-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none mb-4'
                    />
                    <button
                        type="button"
                        onClick={handleAddBenefit}
                        className='bg-richyellow-50 text-white ml-4 rounded-md mb-2 px-4'
                    >
                        Add Benefit
                    </button>
                    <br />

                    {/* Requirments with add button */}
                    <div className='flex flex-col items-start'>
                        <label htmlFor="requirement" className='text-white ml-4 text-start'>Requirements</label>
                        <input type="text"

                            placeholder="Enter Some Requirements"
                            name='requirement'
                            id='requirement'
                            value={fromData.requirement}
                            onChange={changeHandeler}
                            className='border border-gray-300 border-b-blue-300 focus:border-blue-400 w-[95%] ml-4 p-2 rounded-md outline-none mb-4'
                        />
                        <button onClick={addRequirements} className='text-white cursor-pointer translate-x-4'>Add</button>
                        {
                            temp && temp.map((data, indx) => {
                                return (
                                    <div key={indx}
                                        className='flex items-center bg-blue-800 text-[#e3dddd] rounded-full h-10 px-3 py-1 mr-2 mb-2'
                                    >
                                        {data}
                                        <button
                                            type="button"
                                            className="ml-2 text-[yellow] focus:outline-none"
                                            onClick={() => removerequirements(indx)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button type='submit'
                        className='text-white bg-blue-700 hover:bg-blue-500 focus:ring-2 translate-x-[16rem]
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mt-2 mb-2 ml-4
                                dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                    >
                        Save
                    </button>

                </form>
            </div>
        </>
    )
}

export default CourseInfo
