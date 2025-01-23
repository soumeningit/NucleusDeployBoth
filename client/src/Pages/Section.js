import React, { useState } from 'react';

const Section = ({ section }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border p-4 mb-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{section.sectionName}</h2>
                <button
                    className="text-blue-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? 'Hide' : 'Show'}
                </button>
            </div>
            {isOpen && (
                <div className="mt-4">
                    {section.subSection.map((subSection) => (
                        <div key={subSection._id} className="mb-2">
                            <h3 className="text-lg font-medium">{subSection.title}</h3>
                            <p>{subSection.description}</p>
                            <a href={subSection.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">Watch Video</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Section;
