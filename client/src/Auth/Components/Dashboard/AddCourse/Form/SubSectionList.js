// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SubSectionForm from './SubsectionForm';
// import { useSelector } from 'react-redux';
// import { fetchCourseDetails } from '../../../../service/CourseAPI';
// import { Link } from 'react-router-dom';

// const SubSectionList = ({ sectionId }) => {
//     const [subSections, setSubSections] = useState([]);
//     const [selectedSubSection, setSelectedSubSection] = useState(null);

//     const { courseId } = useSelector((state) => state.course);

//     useEffect(() => {
//         fetchSubSections();
//     }, []);

//     const fetchSubSections = async () => {
//         const response = await fetchCourseDetails(courseId);
//         console.log("Response inside Subsectionlist : ", response);
//         console.log("id : ", response.data.courseContent._id)
//         // setSubSections(response.data.courseContent.subSection);
//         // setSections(response.data.courseContent);
//         // console.log("SubSections : ", subSections)
//         // console.log("response.data.courseContent.subSection : ", response.data.courseContent.subSections)

//         const courseContent = response.data.courseContent;
//         const section = courseContent.find(sec => sec._id === sectionId);
//         if (section) {
//             setSubSections(section.subSection);
//         }
//     };

//     const handleDeleteSubSection = async (subSectionId) => {
//         await axios.delete(`/api/subsections/${subSectionId}`);
//         fetchSubSections();
//     };

//     console.log("Subsections : ", subSections);

//     return (
//         <div className="ml-4">
//             <h2 className="text-xl font-bold mb-2">Subsections</h2>
//             <SubSectionForm sectionId={sectionId} fetchSubSections={fetchSubSections} selectedSubSection={selectedSubSection} />
//             <ul>
//                 {subSections?.map((subSection) => (
//                     <li key={subSection._id} className="border p-2 mb-2">
//                         <div className="flex justify-between items-center">
//                             <Link to={subSection.videoUrl}><span>{subSection.title}</span></Link>
//                             <span></span>
//                             <div>
//                                 <button onClick={() => setSelectedSubSection(subSection)}>Edit</button>
//                                 <button onClick={() => handleDeleteSubSection(subSection._id)}>Delete</button>
//                             </div>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default SubSectionList;
import React, { useState, useEffect } from 'react';
import SubsectionForm from './SubsectionForm';
import { useSelector } from 'react-redux';
import { fetchCourseDetails } from '../../../../service/CourseAPI';
import { Link } from 'react-router-dom';
import { deleteSubSection } from '../../../../service/CourseAPI'

const SubSectionList = ({ sectionId }) => {
    const [subSections, setSubSections] = useState([]);
    const [selectedSubSection, setSelectedSubSection] = useState(null);
    const { courseId } = useSelector((state) => state.course);

    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        fetchSubSections();
    }, [courseId, sectionId]);

    const fetchSubSections = async () => {
        const response = await fetchCourseDetails(courseId);
        const courseContent = response.data.courseContent;
        const section = courseContent.find(sec => sec._id === sectionId);
        if (section) {
            setSubSections(section.subSection);
        }
    };

    const handleDeleteSubSection = async (subSectionId) => {
        // subSectionId, sectionId
        const data = {}
        data.subSectionId = subSectionId;
        data.sectionId = sectionId;
        console.log("data in deletesubsection : ", data)
        await deleteSubSection(data, token);
        fetchSubSections();
    };

    return (
        <div className="ml-4">
            <h2 className="text-xl font-bold mb-2">Subsections</h2>
            <SubsectionForm
                sectionId={sectionId}
                fetchSubSections={fetchSubSections}
                selectedSubSection={selectedSubSection}
            />
            <ul>
                {subSections?.map((subSection) => (
                    <li key={subSection._id} className="border p-2 mb-2">
                        <div className="flex justify-between items-center">
                            <Link to={subSection.videoUrl}><span>{subSection.title}</span></Link>
                            <div>
                                <button onClick={() => setSelectedSubSection(subSection)}>Edit</button>
                                <button onClick={() => handleDeleteSubSection(subSection._id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubSectionList;
