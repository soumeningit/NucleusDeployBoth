import { useState, useEffect } from 'react';
import { createSection } from '../../../../service/CourseAPI';
import { useSelector } from 'react-redux';
import { updateSection } from '../../../../service/CourseAPI';


function SectionForm({ fetchSections, selectedSection }) {
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
                className="border p-2 w-full mb-2 rounded-md"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
                {isUpdating ? 'Update' : 'Add'} Section
            </button>
        </form>
    );
};

export default SectionForm;
