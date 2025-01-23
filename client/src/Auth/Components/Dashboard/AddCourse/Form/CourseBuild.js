// // import React from 'react'
// // import UploadFileCard from './UploadFileCard'
// // import { useDispatch } from 'react-redux';
// // import { setIsOpen } from '../../../../Slices/courseSlice';
// // import VideoCard from './VideoCard';

// // function CourseBuild() {

// //     // const [isOpen, setIsOpen] = useState(false)


// // const dispatch = useDispatch();

// // const handleUpload = () => {
// //     console.log("upload button clicked")
// //     dispatch(setIsOpen(true))
// // }
// //     return (
// //         <>
// //             <div>CourseBuild</div>
// // <button
// //     className='px-2 py-1 bg-blue-100 text-richblue-600 shadow-lg transform transform-all rounded-md'
// //     onClick={handleUpload}
// // >
// //     Upload
// // </button >

// //             {/* <UploadFileCard /> */}
// //             <VideoCard />


// //         </>
// //     )
// // }

// // export default CourseBuild



// import React, { useState } from 'react';
// import './SectionForm.css';
// import VideoCard from './VideoCard';
// import { useDispatch } from 'react-redux';
// import { setIsOpen } from '../../../../Slices/courseSlice';

// const CourseBuild = () => {
//     const [inputValue, setInputValue] = useState('');
//     const [sections, setSections] = useState([]);
//     const [subsectionInputs, setSubsectionInputs] = useState({});

//     const dispatch = useDispatch();

//     const handleUpload = () => {
//         console.log("upload button clicked")
//         dispatch(setIsOpen(true))
//     }
//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     const handleAddSection = () => {
//         if (inputValue.trim() !== '') {
//             setSections([...sections, { id: Date.now(), text: inputValue, subsections: [] }]);
//             setInputValue('');
//         }
//     };

//     const handleUpdateSection = (id) => {
//         const updatedText = prompt('Enter the new text:');
//         if (updatedText) {
//             setSections(
//                 sections.map(section =>
//                     section.id === id ? { ...section, text: updatedText } : section
//                 )
//             );
//         }
//     };

//     const handleDeleteSection = (id) => {
//         setSections(sections.filter(section => section.id !== id));
//     };

//     const handleAddSubsection = (id) => {
//         const newSubsectionText = prompt('Enter subsection text:');
//         if (newSubsectionText) {
//             setSections(
//                 sections.map(section =>
//                     section.id === id
//                         ? {
//                             ...section,
//                             subsections: [...section.subsections, { id: Date.now(), text: newSubsectionText }],
//                         }
//                         : section
//                 )
//             );
//         }
//     };

//     const handleDeleteSubsection = (sectionId, subsectionId) => {
//         setSections(
//             sections.map(section =>
//                 section.id === sectionId
//                     ? {
//                         ...section,
//                         subsections: section.subsections.filter(subsection => subsection.id !== subsectionId),
//                     }
//                     : section
//             )
//         );
//     };

//     return (
//         <div className="section-form">
//             <div className="input-container">
//                 <input
//                     type="text"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     placeholder="Enter section text"
//                 />
//                 <button onClick={handleAddSection}>Add Section</button>
//             </div>
//             <div className="sections">
//                 {sections.map(section => (
//                     <div key={section.id} className="section">
//                         <div className="section-header">
//                             <p>{section.text}</p>
//                             <button onClick={() => handleUpdateSection(section.id)}>Update</button>
//                             <button onClick={() => handleDeleteSection(section.id)}>Delete</button>
//                             <button onClick={() => handleAddSubsection(section.id)}>Add Subsection</button>
//                         </div>
//                         <div className="subsections">
//                             {section.subsections.map(subsection => (
//                                 <div key={subsection.id} className="subsection">
//                                     <p>{subsection.text}</p>
//                                     <button onClick={() => handleDeleteSubsection(section.id, subsection.id)}>Delete</button>
//                                 </div>
//                             ))}
//                         </div>

//                     </div>
//                 ))}
//             </div>
//             <button
//                 className='px-2 py-1 bg-blue-100 text-richblue-600 shadow-lg transform transform-all rounded-md'
//                 onClick={handleUpload}
//             >
//                 Upload
//             </button >
//             <VideoCard />
//         </div>
//     );
// };

// export default CourseBuild;

// import React, { useState } from 'react';
// import VideoCard from './VideoCard';

// const SectionForm = () => {
//     const [inputValue, setInputValue] = useState('');
//     const [sections, setSections] = useState([]);
//     const [subsectionInputs, setSubsectionInputs] = useState({});

//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     const handleAddSection = () => {
//         if (inputValue.trim() !== '') {
//             setSections([...sections, { id: Date.now(), text: inputValue, subsections: [] }]);
//             setInputValue('');
//         }
//     };

//     const handleUpdateSection = (id) => {
//         const updatedText = prompt('Enter the new text:');
//         if (updatedText) {
//             setSections(
//                 sections.map(section =>
//                     section.id === id ? { ...section, text: updatedText } : section
//                 )
//             );
//         }
//     };

//     const handleDeleteSection = (id) => {
//         setSections(sections.filter(section => section.id !== id));
//     };

//     const handleAddSubsection = (id) => {
//         const newSubsection = { id: Date.now(), text: '' };
//         setSections(
//             sections.map(section =>
//                 section.id === id
//                     ? {
//                         ...section,
//                         subsections: [...section.subsections, newSubsection],
//                     }
//                     : section
//             )
//         );
//         setSubsectionInputs({ ...subsectionInputs, [newSubsection.id]: '' });
//     };

//     const handleSubsectionInputChange = (e, sectionId, subsectionId) => {
//         const { value } = e.target;
//         setSubsectionInputs({ ...subsectionInputs, [subsectionId]: value });
//         setSections(
//             sections.map(section =>
//                 section.id === sectionId
//                     ? {
//                         ...section,
//                         subsections: section.subsections.map(subsection =>
//                             subsection.id === subsectionId ? { ...subsection, text: value } : subsection
//                         ),
//                     }
//                     : section
//             )
//         );
//     };

//     const handleDeleteSubsection = (sectionId, subsectionId) => {
//         setSections(
//             sections.map(section =>
//                 section.id === sectionId
//                     ? {
//                         ...section,
//                         subsections: section.subsections.filter(subsection => subsection.id !== subsectionId),
//                     }
//                     : section
//             )
//         );
//     };

//     const handleUpdateSubsection = (sectionId, subsectionId) => {
//         const updatedText = prompt('Enter the new text:');
//         if (updatedText) {
//             setSections(
//                 sections.map(section =>
//                     section.id === sectionId
//                         ? {
//                             ...section,
//                             subsections: section.subsections.map(subsection =>
//                                 subsection.id === subsectionId ? { ...subsection, text: updatedText } : subsection
//                             ),
//                         }
//                         : section
//                 )
//             );
//         }
//     };

//     return (
//         <div className="p-4">
//             <div className="flex gap-2 mb-4">
//                 <input
//                     type="text"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     placeholder="Enter section text"
//                     className="p-2 border border-gray-300 rounded"
//                 />
//                 <button
//                     onClick={handleAddSection}
//                     className="p-2 bg-blue-500 text-white rounded"
//                 >
//                     Add Section
//                 </button>
//             </div>
//             <div>
//                 {sections.map(section => (
//                     <div key={section.id} className="border p-4 mb-4 rounded">
//                         <div className="flex gap-2 mb-2">
//                             <p className="flex-grow">{section.text}</p>
//                             <button
//                                 onClick={() => handleUpdateSection(section.id)}
//                                 className="p-2 bg-yellow-500 text-white rounded"
//                             >
//                                 Update
//                             </button>
//                             <button
//                                 onClick={() => handleDeleteSection(section.id)}
//                                 className="p-2 bg-red-500 text-white rounded"
//                             >
//                                 Delete
//                             </button>
//                             <button
//                                 onClick={() => handleAddSubsection(section.id)}
//                                 className="p-2 bg-green-500 text-white rounded"
//                             >
//                                 Add Subsection
//                             </button>
//                         </div>
//                         <div className="ml-4">
//                             {section.subsections.map(subsection => (
//                                 <div key={subsection.id} className="flex gap-2 mb-2">
//                                     <input
//                                         type="text"
//                                         value={subsection.text}
//                                         onChange={(e) => handleSubsectionInputChange(e, section.id, subsection.id)}
//                                         placeholder="Enter subsection text"
//                                         className="p-2 border border-gray-300 rounded flex-grow"
//                                     />
//                                     <button
//                                         onClick={() => handleUpdateSubsection(section.id, subsection.id)}
//                                         className="p-2 bg-yellow-500 text-white rounded"
//                                     >
//                                         Update
//                                     </button>
//                                     <button
//                                         onClick={() => handleDeleteSubsection(section.id, subsection.id)}
//                                         className="p-2 bg-red-500 text-white rounded"
//                                     >
//                                         Delete
//                                     </button>
//                                     <VideoCard />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SectionForm;


// import React, { useState } from 'react';
// import VideoCard from './VideoCard';
// import { useSelector } from 'react-redux';
// import { createSection } from '../../../../service/CourseAPI';
// import Collapse from './Collapse';

// const SectionForm = () => {

//     const { courseId } = useSelector((state) => state.course)
//     console.log("Course Id : ", courseId);
//     const { token } = useSelector((state) => state.auth);

//     const [inputValue, setInputValue] = useState('');
//     const [sections, setSections] = useState([]);
//     const [subsectionInputs, setSubsectionInputs] = useState({});

//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     const handleAddSection = async () => {
//         if (inputValue.trim() !== '') {
//             setSections([...sections, { id: Date.now(), text: inputValue, subsections: [] }]);
//             setInputValue('');
//             // let sectionName = inputValue;
//             console.log("sectionName : ", inputValue)
//             let data = {};
//             data['courseId'] = courseId;
//             data['sectionName'] = inputValue;
//             console.log("data : ", data);

//             const response = await createSection(data, token);
//             console.log("response : ", response);
//         }
//     };

//     const handleUpdateSection = (id) => {
//         const updatedText = prompt('Enter the new text:');
//         if (updatedText) {
//             setSections(
//                 sections.map(section =>
//                     section.id === id ? { ...section, text: updatedText } : section
//                 )
//             );
//         }
//     };

//     const handleDeleteSection = (id) => {
//         setSections(sections.filter(section => section.id !== id));
//     };

//     const handleAddSubsection = (id) => {
//         const newSubsection = { id: Date.now(), text: '' };
//         setSections(
//             sections.map(section =>
//                 section.id === id
//                     ? {
//                         ...section,
//                         subsections: [...section.subsections, newSubsection],
//                     }
//                     : section
//             )
//         );
//         setSubsectionInputs({ ...subsectionInputs, [newSubsection.id]: '' });
//     };

//     const handleSubsectionInputChange = (e, sectionId, subsectionId) => {
//         const { value } = e.target;
//         setSubsectionInputs({ ...subsectionInputs, [subsectionId]: value });
//         setSections(
//             sections.map(section =>
//                 section.id === sectionId
//                     ? {
//                         ...section,
//                         subsections: section.subsections.map(subsection =>
//                             subsection.id === subsectionId ? { ...subsection, text: value } : subsection
//                         ),
//                     }
//                     : section
//             )
//         );
//     };

//     const handleDeleteSubsection = (sectionId, subsectionId) => {
//         setSections(
//             sections.map(section =>
//                 section.id === sectionId
//                     ? {
//                         ...section,
//                         subsections: section.subsections.filter(subsection => subsection.id !== subsectionId),
//                     }
//                     : section
//             )
//         );
//     };

//     const handleUpdateSubsection = (sectionId, subsectionId) => {
//         const updatedText = prompt('Enter the new text:');
//         if (updatedText) {
//             setSections(
//                 sections.map(section =>
//                     section.id === sectionId
//                         ? {
//                             ...section,
//                             subsections: section.subsections.map(subsection =>
//                                 subsection.id === subsectionId ? { ...subsection, text: updatedText } : subsection
//                             ),
//                         }
//                         : section
//                 )
//             );
//         }
//     };

//     return (
//         <div className="p-4">
//             <div className="flex gap-2 mb-4">
//                 <input
//                     type="text"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     placeholder="Enter section text"
//                     className="p-2 border border-gray-300 rounded"
//                 />
//                 <button
//                     onClick={handleAddSection}
//                     className="p-2 bg-blue-500 text-white rounded"
//                 >
//                     Add Section
//                 </button>

//             </div>
//             <div>
//                 {sections.map(section => (
//                     <div key={section.id} className="border p-4 mb-4 rounded">
//                         <div className="flex gap-2 mb-2">
//                             <p className="flex-grow">{section.text}</p>
//                             <button
//                                 onClick={() => handleUpdateSection(section.id)}
//                                 className="p-2 bg-yellow-500 text-white rounded"
//                             >
//                                 Update
//                             </button>
//                             <button
//                                 onClick={() => handleDeleteSection(section.id)}
//                                 className="p-2 bg-red-500 text-white rounded"
//                             >
//                                 Delete
//                             </button>
//                             <button
//                                 onClick={() => handleAddSubsection(section.id)}
//                                 className="p-2 bg-green-500 text-white rounded"
//                             >
//                                 Add Subsection
//                             </button>
//                         </div>
//                         <div className="ml-4">
//                             {section.subsections.map(subsection => (
//                                 <div key={subsection.id} className="flex gap-2 mb-2">
//                                     <input
//                                         type="text"
//                                         value={subsectionInputs[subsection.id] || ''}
//                                         onChange={(e) => handleSubsectionInputChange(e, section.id, subsection.id)}
//                                         placeholder="Enter subsection text"
//                                         className="p-2 border border-gray-300 rounded flex-grow"
//                                     />
//                                     <button
//                                         onClick={() => handleUpdateSubsection(section.id, subsection.id)}
//                                         className="p-2 bg-yellow-500 text-white rounded"
//                                     >
//                                         Update
//                                     </button>
//                                     <button
//                                         onClick={() => handleDeleteSubsection(section.id, subsection.id)}
//                                         className="p-2 bg-red-500 text-white rounded"
//                                     >
//                                         Delete
//                                     </button>
//                                     <VideoCard />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//                 <Collapse />
//             </div>
//         </div>
//     );
// };

// export default SectionForm;


import React from 'react'
import SectionList from './SectionList'

function CourseBuild() {
    return (
        <div>
            <h1>Course Build</h1>
            <SectionList />
        </div>
    )
}

export default CourseBuild

