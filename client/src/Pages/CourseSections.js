import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineExpandAlt } from 'react-icons/ai';

const CourseSections = () => {
    const [sections, setSections] = useState([{ title: '', subsections: [] }]);
    const [expandAll, setExpandAll] = useState(false);

    const addSection = () => {
        setSections([...sections, { title: '', subsections: [] }]);
    };

    const removeSection = (index) => {
        const newSections = [...sections];
        newSections.splice(index, 1);
        setSections(newSections);
    };

    const handleSectionChange = (index, event) => {
        const newSections = [...sections];
        newSections[index].title = event.target.value;
        setSections(newSections);
    };

    const addSubsection = (sectionIndex) => {
        const newSections = [...sections];
        newSections[sectionIndex].subsections.push('');
        setSections(newSections);
    };

    const removeSubsection = (sectionIndex, subsectionIndex) => {
        const newSections = [...sections];
        newSections[sectionIndex].subsections.splice(subsectionIndex, 1);
        setSections(newSections);
    };

    const handleSubsectionChange = (sectionIndex, subsectionIndex, event) => {
        const newSections = [...sections];
        newSections[sectionIndex].subsections[subsectionIndex] = event.target.value;
        setSections(newSections);
    };

    const toggleExpandAll = () => {
        setExpandAll(!expandAll);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Course Sections</h1>
            <button
                onClick={addSection}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                <AiOutlinePlus /> Add Section
            </button>
            <button
                onClick={toggleExpandAll}
                className="mb-4 ml-2 px-4 py-2 bg-green-500 text-[#00fbff] rounded-md hover:bg-green-600"
            >
                <AiOutlineExpandAlt className='text-2xl  text-[#00fbff] font-bold text-wrap' /> {expandAll ? 'Collapse All' : 'Expand All'}
            </button>
            {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-4 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            value={section.title}
                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                            placeholder="Section Title"
                            className="w-full px-2 py-1 border rounded-md"
                        />
                        <button
                            onClick={() => removeSection(sectionIndex)}
                            className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            <AiOutlineMinus className='text-2xl text-[#00fbff] font-bold text-wrap' /> Remove Section
                        </button>
                    </div>
                    <div className={`mt-4 ${expandAll ? '' : 'hidden'}`}>
                        <button
                            onClick={() => addSubsection(sectionIndex)}
                            className="mb-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            <AiOutlinePlus className='text-xl text-bold  text-[#00fbff] text-transparent' /> Add Subsection
                        </button>
                        {section.subsections.map((subsection, subsectionIndex) => (
                            <div key={subsectionIndex} className="mb-2 flex items-center">
                                <input
                                    type="text"
                                    value={subsection}
                                    onChange={(e) => handleSubsectionChange(sectionIndex, subsectionIndex, e)}
                                    placeholder="Subsection Title"
                                    className="w-full px-2 py-1 border rounded-md"
                                />
                                <button
                                    onClick={() => removeSubsection(sectionIndex, subsectionIndex)}
                                    className="ml-2 px-4 py-2 bg-red-500  text-[#00fbff] rounded-md hover:bg-red-600"
                                >
                                    <AiOutlineMinus className='text-2xl text-[#00fbff] font-bold text-wrap' /> Remove Subsection
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseSections;
