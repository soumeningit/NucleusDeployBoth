// updated

import { useState, useEffect } from 'react';
import SectionForm from './SectionForm';
import SubSectionList from './SubSectionList';
import { fetchCourseDetails } from '../../../../service/CourseAPI';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSection } from '../../../../service/CourseAPI'
import { setIsFormVisible } from '../../../../Slices/courseSlice'

function SectionList() {
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [activeSectionId, setActiveSectionId] = useState(null);
    // const [isFormVisible, setIsFormVisible] = useState(false);

    const [hideStates, setHideStates] = useState({});

    const courseId = useSelector((state) => state.course.courseId);

    const { token } = useSelector((state) => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {
        fetchSections();
    }, [courseId]);

    const fetchSections = async () => {
        const response = await fetchCourseDetails(courseId);
        setSections(response.data.courseContent);
    };

    const handleDeleteSection = async (sectionId) => {
        const data = {}
        data.sectionId = sectionId
        await deleteSection(data, token);
        fetchSections();
    };

    const handleAddSubsectionClick = (sectionId) => {
        setActiveSectionId(sectionId);
    };


    const toggleHide = (sectionId) => {
        setHideStates(prevStates => ({
            ...prevStates,
            [sectionId]: !prevStates[sectionId]
        }));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-richblack-5">Sections</h1>
            <SectionForm fetchSections={fetchSections} selectedSection={selectedSection} />
            <ul>
                {sections?.map((section) => (
                    <li key={section._id} className="border border-[#b2afaf] p-2 mb-2 rounded-md">
                        <div className="flex justify-between items-center">
                            <span className='text-base text-[#cbc7c7]'>{section.sectionName}</span>
                            <div className='flex gap-x-2 text-base text-[#c0b9b9]'>
                                <button onClick={() => setSelectedSection(section)}>Edit</button>
                                <button onClick={() => handleDeleteSection(section._id)}>Delete</button>
                                <button onClick={() => {
                                    handleAddSubsectionClick(section._id)
                                    dispatch(setIsFormVisible(true))
                                }}
                                >
                                    Add Subsection
                                </button>
                                <button
                                    className="text-gray-500 focus:outline-none"
                                    onClick={() => toggleHide(section._id)}
                                >
                                    {
                                        hideStates[section._id] ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 15l7-7 7 7"
                                                />
                                            </svg>
                                        )}
                                </button>
                            </div>
                        </div>

                        {activeSectionId === section._id && (
                            <div className={`${hideStates[section._id] ? 'hidden' : 'block'} p-4 border-t`}>
                                <SubSectionList sectionId={section._id} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default SectionList;