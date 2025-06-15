import { useState, useEffect } from 'react';
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
        // console.log("data in deletesubsection : ", data)
        await deleteSubSection(data, token);
        fetchSubSections();
    };

    return (
        <div className="ml-4">
            <h2 className="text-xl font-bold mb-2 text-[#c4bdbd]">Subsections</h2>
            <SubsectionForm
                sectionId={sectionId}
                fetchSubSections={fetchSubSections}
                selectedSubSection={selectedSubSection}
            />
            <ul>
                {subSections?.map((subSection) => (
                    <li key={subSection._id} className="border p-2 mb-2 border-[#cfc3c3] rounded-md">
                        <div className="flex justify-between items-center text-[#e9e5e5]">
                            <Link to={subSection.videoUrl}><span>{subSection.title}</span></Link>
                            <div className='flex gap-x-2 text-[#bdb7b7]'>
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
