// import React, { useState } from 'react';

// const Collapse = () => {
//     const faqData = [
//         {
//             question: "What payment methods do you accept?",
//             answer: "We accept all major credit and debit cards."
//         },
//         {
//             question: "How do I access my course materials?",
//             answer: "Once you enroll in a course, you will get access to the materials immediately."
//         },
//         // Add more FAQ items as needed
//     ];

//     const [activeIndex, setActiveIndex] = useState(null);

//     const toggleAccordion = (index) => {
//         setActiveIndex(activeIndex === index ? null : index);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h1>
//             {faqData.map((faq, index) => (
//                 <div key={index} className="border rounded-lg my-2">
//                     <button
//                         onClick={() => toggleAccordion(index)}
//                         className="w-full text-left p-4 focus:outline-none"
//                     >
//                         <div className="flex justify-between items-center">
//                             <span className="text-lg font-semibold">{faq.question}</span>
//                             <span className="text-lg">{activeIndex === index ? '-' : '+'}</span>
//                         </div>
//                     </button>
//                     {activeIndex === index && (
//                         <div className="p-4">
//                             <p className="text-gray-800">{faq.answer}</p>
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Collapse;



// import React, { useState } from 'react';

// const CollapsibleSection = () => {
//     const [collapsed, setCollapsed] = useState(true);

//     const toggleCollapse = () => {
//         setCollapsed(!collapsed);
//     };

//     return (
//         <div className="p-4 border rounded">
//             <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
//                 onClick={toggleCollapse}
//             >
//                 {collapsed ? 'Expand' : 'Collapse'} Subsections
//             </button>

//             <div className={`${collapsed ? 'hidden' : 'block'}`}>
//                 <div className="border rounded p-2 mb-2">Subsection 1</div>
//                 <div className="border rounded p-2 mb-2">Subsection 2</div>
//                 <div className="border rounded p-2 mb-2">Subsection 3</div>
//                 {/* Add more subsections as needed */}
//             </div>
//         </div>
//     );
// };

// export default CollapsibleSection;

import React, { useState } from 'react';

const CollapsibleSection = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="border rounded mb-4">
            <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold">Section Name</h2>
                <button
                    className="text-gray-500 focus:outline-none"
                    onClick={toggleCollapse}
                >
                    {collapsed ? (
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

            <div className={`${collapsed ? 'hidden' : 'block'} p-4 border-t`}>
                <div className="border rounded p-2 mb-2">Subsection 1</div>
                <div className="border rounded p-2 mb-2">Subsection 2</div>
                <div className="border rounded p-2 mb-2">Subsection 3</div>
                {/* Add more subsections as needed */}
            </div>
        </div>
    );
};

export default CollapsibleSection;

