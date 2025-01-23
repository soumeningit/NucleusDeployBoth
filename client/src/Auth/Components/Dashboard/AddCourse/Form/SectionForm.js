// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { createSection } from '../../../../service/CourseAPI'
// import { useSelector } from 'react-redux';

// const SectionForm = ({ fetchSections, selectedSection }) => {
//     const [sectionName, setSectionName] = useState('');
//     const [isUpdating, setIsUpdating] = useState(false);

//     const { token } = useSelector((state) => state.auth);
//     // const userId = useSelector((state) => state.profile.user.id)
//     const courseId = useSelector((state) => state.course.courseId)
//     console.log("TOKEN : ", token)
//     // console.log("USER ID : ", userId)
//     console.log("COURSE ID : ", courseId)
//     const data = {};
//     // data.userId = userId;
//     data.courseId = courseId;
//     data.sectionName = sectionName;
//     console.log("DATA : ", data)

//     useEffect(() => {
//         if (selectedSection) {
//             setSectionName(selectedSection.sectionName);
//             setIsUpdating(true);
//         } else {
//             setSectionName('');
//             setIsUpdating(false);
//         }
//     }, [selectedSection]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (isUpdating) {
//             await axios.put();
//         } else {
//             console.log("Sending response to server .....", data)
//             const response = await createSection(data, token);
//             console.log("RESPONSE in section form: ", response)
//         }
//         fetchSections();
//         setSectionName('');
//         setIsUpdating(false);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="mb-4">
//             <input
//                 type="text"
//                 value={sectionName}
//                 onChange={(e) => setSectionName(e.target.value)}
//                 placeholder="Section Name"
//                 className="border p-2 w-full mb-2"
//             />
//             <button type="submit" className="bg-blue-500 text-white p-2">
//                 {isUpdating ? 'Update' : 'Add'} Section
//             </button>
//         </form>
//     );
// };

// export default SectionForm;

import React, { useState, useEffect } from 'react';
import { createSection } from '../../../../service/CourseAPI';
import { useSelector } from 'react-redux';
import { updateSection } from '../../../../service/CourseAPI';


const SectionForm = ({ fetchSections, selectedSection }) => {
    const [sectionName, setSectionName] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const courseId = useSelector((state) => state.course.courseId);

    useEffect(() => {
        if (selectedSection) {
            setSectionName(selectedSection.sectionName);
            setIsUpdating(true);
        } else {
            setSectionName('');
            setIsUpdating(false);
        }
    }, [selectedSection]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { courseId, sectionName };
        // sectionName, sectionId
        const obj = {}
        obj['sectionName'] = sectionName;
        obj['sectionId'] = selectedSection?._id;
        // formData.append('sectionName', sectionName);
        // formData.append('sectionId', selectedSection._id);
        if (isUpdating) {
            const updateSectionData = await updateSection(obj, token);
            console.log("updateSectionData : ", updateSectionData)
        } else {
            await createSection(data, token);
        }
        fetchSections();
        setSectionName('');
        setIsUpdating(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                placeholder="Section Name"
                className="border p-2 w-full mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
                {isUpdating ? 'Update' : 'Add'} Section
            </button>
        </form>
    );
};

export default SectionForm;
