// import { useState, useEffect } from "react";
// import DashboardHeader from "../Components/DashboardHeader";
// import CourseDetailsForm from "../CreateCourse/CourseDetailsForm";
// import CurriculumForm from "../CreateCourse/CurriculumForm";
// import TipsCard from "../CreateCourse/TipsCard";
// import { getAllCategoriesAPI } from "../../operation/service/CategoryService";
// import useAuthContext from "../../customhooks/useAuthContext";
// import { createCourseAPI } from "../../operation/service/CourseService";

// // Helper
// const countWords = (text) =>
//   text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

// function CreateCoursePage() {
//   const [step, setStep] = useState(1);
//   const [courseId, setCourseId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Step 1
//   const [details, setDetails] = useState({
//     courseName: "",
//     shortDescription: "",
//     detailedDescription: "",
//     category: "",
//     thumbnail: null,
//     price: "",
//   });
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");
//   const [prerequisites, setPrerequisites] = useState([]);
//   const [prerequisiteInput, setPrerequisiteInput] = useState("");
//   const [wordCounts, setWordCounts] = useState({ short: 0, detailed: 0 });
//   const [thumbnail, setThumbnail] = useState(null);
//   const [whatYouWillLearn, setWhatYouWillLearn] = useState([]);
//   const [thumbnailPreview, setThumbnailPreview] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [token] = useAuthContext();

//   // Step 2
//   const [curriculum, setCurriculum] = useState([
//     { sectionName: "", subsections: [{ subsectionName: "", video: null }] },
//   ]);

//   async function fetchCategories() {
//     try {
//       const response = await getAllCategoriesAPI();
//       if (response.status === 200) {
//         setCategories(response.data.data);
//       }
//       console.log("Fetched categories:", response);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setCategories([]);
//     }
//   }

//   useEffect(() => {
//     if (categories.length === 0) {
//       fetchCategories();
//     }
//   }, []);

//   useEffect(() => {
//     setWordCounts({
//       short: countWords(details.shortDescription),
//       detailed: countWords(details.detailedDescription),
//     });
//   }, [details.shortDescription, details.detailedDescription]);

//   const handleKeyDown = (e, type) => {
//     if (e.key !== "Enter") return;
//     e.preventDefault();
//     if (type === "tag" && tagInput.trim()) {
//       if (tags.length < 10 && !tags.includes(tagInput.trim()))
//         setTags([...tags, tagInput.trim()]);
//       setTagInput("");
//     } else if (type === "prerequisite" && prerequisiteInput.trim()) {
//       if (!prerequisites.includes(prerequisiteInput.trim()))
//         setPrerequisites([...prerequisites, prerequisiteInput.trim()]);
//       setPrerequisiteInput("");
//     }
//   };

//   const handleDetailsSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     console.log("Submitting Step 1 Data:", { ...details, tags, prerequisites });

//     const formData = new FormData();

//     formData.append("courseName", details.courseName);
//     formData.append("shortDescription", details.shortDescription);
//     formData.append("detailedDescription", details.detailedDescription);
//     formData.append("category", details.category);
//     formData.append("price", details.price);
//     formData.append("whatYouWillLearn", JSON.stringify(whatYouWillLearn));
//     formData.append("tags", JSON.stringify(tags));
//     formData.append("prerequisites", JSON.stringify(prerequisites));
//     if (thumbnail) {
//       formData.append("thumbnail", thumbnail);
//     }
//     // Simulate API call

//     try {
//       const response = await createCourseAPI(formData, token);

//       console.log("Create Course Response:", response);

//       if (response.status === 201) {
//         setIsLoading(false);
//         setCourseId(response.data.data);
//         setStep(2);
//       }
//     } catch (error) {
//       console.error("Error creating course:", error);
//       setIsLoading(false);
//     }
//   };

//   const handleCurriculumSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting Curriculum:", curriculum);
//     alert("Course curriculum submitted and course is now published!");
//   };

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0];
//     setThumbnail(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setThumbnailPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setThumbnailPreview(null);
//     }
//   };

//   const handleDeleteThumbnail = () => {
//     setThumbnail(null);
//     setThumbnailPreview(null);
//   };

//   return (
//     <div>
//       <DashboardHeader title="Create a New Course" />

//       <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
//         <div className="lg:col-span-2">
//           {step === 1 ? (
//             <CourseDetailsForm
//               details={details}
//               setDetails={setDetails}
//               wordCounts={wordCounts}
//               categories={categories}
//               tags={tags}
//               setTags={setTags}
//               tagInput={tagInput}
//               setTagInput={setTagInput}
//               prerequisites={prerequisites}
//               setPrerequisites={setPrerequisites}
//               prerequisiteInput={prerequisiteInput}
//               setPrerequisiteInput={setPrerequisiteInput}
//               handleKeyDown={handleKeyDown}
//               handleDetailsSubmit={handleDetailsSubmit}
//               isLoading={isLoading}
//               handleThumbnailChange={handleThumbnailChange}
//               thumbnailPreview={thumbnailPreview}
//               whatYouWillLearn={whatYouWillLearn}
//               setWhatYouWillLearn={setWhatYouWillLearn}
//               handleDeleteThumbnail={handleDeleteThumbnail}
//             />
//           ) : (
//             <CurriculumForm
//               curriculum={curriculum}
//               setCurriculum={setCurriculum}
//               handleSectionChange={(i, e) => {
//                 const updated = [...curriculum];
//                 updated[i][e.target.name] = e.target.value;
//                 setCurriculum(updated);
//               }}
//               handleSubsectionChange={(secIdx, subIdx, e) => {
//                 const updated = [...curriculum];
//                 updated[secIdx].subsections[subIdx][e.target.name] =
//                   e.target.value;
//                 setCurriculum(updated);
//               }}
//               handleVideoChange={(secIdx, subIdx, e) => {
//                 const updated = [...curriculum];
//                 updated[secIdx].subsections[subIdx].video = e.target.files[0];
//                 setCurriculum(updated);
//               }}
//               addSection={() =>
//                 setCurriculum([
//                   ...curriculum,
//                   {
//                     sectionName: "",
//                     subsections: [{ subsectionName: "", video: null }],
//                   },
//                 ])
//               }
//               removeSection={(i) =>
//                 setCurriculum(curriculum.filter((_, idx) => idx !== i))
//               }
//               addSubsection={(secIdx) => {
//                 const updated = [...curriculum];
//                 updated[secIdx].subsections.push({
//                   subsectionName: "",
//                   video: null,
//                 });
//                 setCurriculum(updated);
//               }}
//               removeSubsection={(secIdx, subIdx) => {
//                 const updated = [...curriculum];
//                 updated[secIdx].subsections = updated[
//                   secIdx
//                 ].subsections.filter((_, idx) => idx !== subIdx);
//                 setCurriculum(updated);
//               }}
//               handleCurriculumSubmit={handleCurriculumSubmit}
//               setStep={setStep}
//             />
//           )}
//         </div>

//         <div className="lg:col-span-1">
//           <TipsCard />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateCoursePage;

// import { useState, useEffect } from "react";
// import DashboardHeader from "../Components/DashboardHeader";
// import CourseDetailsForm from "../CreateCourse/CourseDetailsForm";
// import CurriculumForm from "../CreateCourse/CurriculumForm";
// import TipsCard from "../CreateCourse/TipsCard";
// import { getAllCategoriesAPI } from "../../operation/service/CategoryService";
// import useAuthContext from "../../customhooks/useAuthContext";
// import { createCourseAPI } from "../../operation/service/CourseService";

// // Helper
// const countWords = (text) =>
//   text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

// // Mock upload function to simulate file upload with progress
// const mockUpload = (file, onProgress) => {
//   return new Promise((resolve) => {
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += Math.floor(Math.random() * 25) + 10;
//       if (progress >= 100) {
//         progress = 100;
//         clearInterval(interval);
//         setTimeout(() => resolve(file), 500); // Resolve after a short delay
//       }
//       onProgress(progress);
//     }, 400);
//   });
// };

// function CreateCoursePage() {
//   const [step, setStep] = useState(1);
//   const [courseId, setCourseId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Step 1
//   const [details, setDetails] = useState({
//     courseName: "",
//     shortDescription: "",
//     detailedDescription: "",
//     category: "",
//     thumbnail: null,
//     price: "",
//   });
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");
//   const [prerequisites, setPrerequisites] = useState([]);
//   const [prerequisiteInput, setPrerequisiteInput] = useState("");
//   const [wordCounts, setWordCounts] = useState({ short: 0, detailed: 0 });
//   const [thumbnail, setThumbnail] = useState(null);
//   const [whatYouWillLearn, setWhatYouWillLearn] = useState([]);
//   const [thumbnailPreview, setThumbnailPreview] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [token] = useAuthContext();

//   // Step 2: Updated curriculum state to handle multiple videos with progress
//   const [curriculum, setCurriculum] = useState([
//     { sectionName: "", subsections: [{ subsectionName: "", videos: [] }] },
//   ]);

//   async function fetchCategories() {
//     try {
//       const response = await getAllCategoriesAPI();
//       if (response.status === 200) {
//         setCategories(response.data.data);
//       }
//       console.log("Fetched categories:", response);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setCategories([]);
//     }
//   }

//   useEffect(() => {
//     if (categories.length === 0) {
//       fetchCategories();
//     }
//   }, []);

//   useEffect(() => {
//     setWordCounts({
//       short: countWords(details.shortDescription),
//       detailed: countWords(details.detailedDescription),
//     });
//   }, [details.shortDescription, details.detailedDescription]);

//   const handleKeyDown = (e, type) => {
//     if (e.key !== "Enter") return;
//     e.preventDefault();
//     if (type === "tag" && tagInput.trim()) {
//       if (tags.length < 10 && !tags.includes(tagInput.trim()))
//         setTags([...tags, tagInput.trim()]);
//       setTagInput("");
//     } else if (type === "prerequisite" && prerequisiteInput.trim()) {
//       if (!prerequisites.includes(prerequisiteInput.trim()))
//         setPrerequisites([...prerequisites, prerequisiteInput.trim()]);
//       setPrerequisiteInput("");
//     }
//   };

//   const handleDetailsSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     console.log("Submitting Step 1 Data:", { ...details, tags, prerequisites });

//     const formData = new FormData();

//     formData.append("courseName", details.courseName);
//     formData.append("shortDescription", details.shortDescription);
//     formData.append("detailedDescription", details.detailedDescription);
//     formData.append("category", details.category);
//     formData.append("price", details.price);
//     formData.append("whatYouWillLearn", JSON.stringify(whatYouWillLearn));
//     formData.append("tags", JSON.stringify(tags));
//     formData.append("prerequisites", JSON.stringify(prerequisites));
//     if (thumbnail) {
//       formData.append("thumbnail", thumbnail);
//     }

//     try {
//       const response = await createCourseAPI(formData, token);
//       console.log("Create Course Response:", response);
//       if (response.status === 201) {
//         setIsLoading(false);
//         setCourseId(response.data.data);
//         setStep(2);
//       }
//     } catch (error) {
//       console.error("Error creating course:", error);
//       setIsLoading(false);
//     }
//   };

//   const handleCurriculumSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting Curriculum:", curriculum);
//     alert("Course curriculum submitted and course is now published!");
//   };

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0];
//     setThumbnail(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setThumbnailPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setThumbnailPreview(null);
//     }
//   };

//   const handleDeleteThumbnail = () => {
//     setThumbnail(null);
//     setThumbnailPreview(null);
//   };

//   // --- NEW LOGIC FOR VIDEO UPLOADS ---
//   const handleVideoUpload = async (secIdx, subIdx, files) => {
//     const newVideos = Array.from(files).map((file) => ({
//       file,
//       progress: 0,
//       status: "uploading",
//     }));

//     // Add new videos to state immediately for UI update
//     const updatedCurriculum = [...curriculum];
//     updatedCurriculum[secIdx].subsections[subIdx].videos.push(...newVideos);
//     setCurriculum(updatedCurriculum);

//     // Start all uploads in parallel
//     await Promise.all(
//       newVideos.map(async (video) => {
//         await mockUpload(video.file, (progress) => {
//           // Update progress for the specific video
//           setCurriculum((prevCurriculum) => {
//             const newCurriculum = [...prevCurriculum];
//             const videoToUpdate = newCurriculum[secIdx].subsections[
//               subIdx
//             ].videos.find((v) => v === video);
//             if (videoToUpdate) {
//               videoToUpdate.progress = progress;
//             }
//             return newCurriculum;
//           });
//         });

//         // Mark as completed
//         setCurriculum((prevCurriculum) => {
//           const newCurriculum = [...prevCurriculum];
//           const videoToUpdate = newCurriculum[secIdx].subsections[
//             subIdx
//           ].videos.find((v) => v === video);
//           if (videoToUpdate) {
//             videoToUpdate.status = "completed";
//           }
//           return newCurriculum;
//         });
//       })
//     );
//   };

//   const removeVideo = (secIdx, subIdx, videoIdx) => {
//     const updatedCurriculum = [...curriculum];
//     updatedCurriculum[secIdx].subsections[subIdx].videos.splice(videoIdx, 1);
//     setCurriculum(updatedCurriculum);
//   };

//   return (
//     <div>
//       <DashboardHeader title="Create a New Course" />

//       <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
//         <div className="lg:col-span-2">
//           {step === 1 ? (
//             <CourseDetailsForm
//               details={details}
//               setDetails={setDetails}
//               wordCounts={wordCounts}
//               categories={categories}
//               tags={tags}
//               setTags={setTags}
//               tagInput={tagInput}
//               setTagInput={setTagInput}
//               prerequisites={prerequisites}
//               setPrerequisites={setPrerequisites}
//               prerequisiteInput={prerequisiteInput}
//               setPrerequisiteInput={setPrerequisiteInput}
//               handleKeyDown={handleKeyDown}
//               handleDetailsSubmit={handleDetailsSubmit}
//               isLoading={isLoading}
//               handleThumbnailChange={handleThumbnailChange}
//               thumbnailPreview={thumbnailPreview}
//               whatYouWillLearn={whatYouWillLearn}
//               setWhatYouWillLearn={setWhatYouWillLearn}
//               handleDeleteThumbnail={handleDeleteThumbnail}
//             />
//           ) : (
//             <CurriculumForm
//               curriculum={curriculum}
//               setCurriculum={setCurriculum}
//               handleSectionChange={(i, e) => {
//                 const updated = [...curriculum];
//                 updated[i][e.target.name] = e.target.value;
//                 setCurriculum(updated);
//               }}
//               handleSubsectionChange={(secIdx, subIdx, e) => {
//                 const updated = [...curriculum];
//                 updated[secIdx].subsections[subIdx][e.target.name] =
//                   e.target.value;
//                 setCurriculum(updated);
//               }}
//               // Pass new handlers for video management
//               handleVideoUpload={handleVideoUpload}
//               removeVideo={removeVideo}
//               addSection={() =>
//                 setCurriculum([
//                   ...curriculum,
//                   {
//                     sectionName: "",
//                     subsections: [{ subsectionName: "", videos: [] }], // Updated structure
//                   },
//                 ])
//               }
//               removeSection={(i) =>
//                 setCurriculum(curriculum.filter((_, idx) => idx !== i))
//               }
//               addSubsection={(secIdx) => {
//                 const updated = [...curriculum];
//                 updated[secIdx].subsections.push({
//                   subsectionName: "",
//                   videos: [], // Updated structure
//                 });
//                 setCurriculum(updated);
//               }}
//               removeSubsection={(secIdx, subIdx) => {
//                 const updated = [...curriculum];
//                 updated[secIdx].subsections = updated[
//                   secIdx
//                 ].subsections.filter((_, idx) => idx !== subIdx);
//                 setCurriculum(updated);
//               }}
//               handleCurriculumSubmit={handleCurriculumSubmit}
//               setStep={setStep}
//             />
//           )}
//         </div>

//         <div className="lg:col-span-1">
//           <TipsCard />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateCoursePage;

// import { FiPlus, FiTrash2, FiVideo, FiArrowLeft } from "react-icons/fi";

// function CurriculumForm({
//   curriculum,
//   setCurriculum,
//   handleSectionChange,
//   handleSubsectionChange,
//   handleVideoChange,
//   addSection,
//   removeSection,
//   addSubsection,
//   removeSubsection,
//   handleCurriculumSubmit,
//   setStep,
// }) {
//   return (
//     <form onSubmit={handleCurriculumSubmit} className="mt-8 space-y-8">
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">
//           Course Curriculum
//         </h2>
//         <div className="space-y-6">
//           {curriculum.map((section, secIdx) => (
//             <div
//               key={secIdx}
//               className="bg-slate-50 p-4 rounded-lg border border-slate-200"
//             >
//               <div className="flex items-center justify-between">
//                 <input
//                   type="text"
//                   name="sectionName"
//                   placeholder={`Section ${secIdx + 1}`}
//                   value={section.sectionName}
//                   onChange={(e) => handleSectionChange(secIdx, e)}
//                   className="flex-grow text-lg font-semibold px-3 py-2 border border-slate-300 rounded-md"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeSection(secIdx)}
//                   className="ml-4 text-slate-400 hover:text-red-500"
//                 >
//                   <FiTrash2 size={20} />
//                 </button>
//               </div>

//               <div className="mt-4 pl-4 space-y-4 border-l-2 border-slate-300">
//                 {section.subsections.map((sub, subIdx) => (
//                   <div key={subIdx} className="flex items-start space-x-4">
//                     <div className="flex-grow space-y-2">
//                       <input
//                         type="text"
//                         name="subsectionName"
//                         placeholder={`Lecture ${subIdx + 1}`}
//                         value={sub.subsectionName}
//                         onChange={(e) =>
//                           handleSubsectionChange(secIdx, subIdx, e)
//                         }
//                         className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md"
//                       />
//                       <div className="flex items-center text-sm text-slate-600">
//                         <FiVideo className="mr-2 text-indigo-500" />
//                         <label
//                           htmlFor={`video-${secIdx}-${subIdx}`}
//                           className="cursor-pointer hover:underline"
//                         >
//                           {sub.video ? sub.video.name : "Upload Video"}
//                         </label>
//                         <input
//                           id={`video-${secIdx}-${subIdx}`}
//                           type="file"
//                           className="sr-only"
//                           onChange={(e) => handleVideoChange(secIdx, subIdx, e)}
//                           accept="video/*"
//                         />
//                       </div>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeSubsection(secIdx, subIdx)}
//                       className="text-slate-400 hover:text-red-500 pt-2"
//                     >
//                       <FiTrash2 size={18} />
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => addSubsection(secIdx)}
//                   className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
//                 >
//                   <FiPlus className="mr-1" /> Add Lecture
//                 </button>
//               </div>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addSection}
//             className="w-full text-center py-3 border-2 border-slate-300 border-dashed rounded-lg text-slate-600 font-semibold hover:bg-slate-100 hover:border-indigo-500"
//           >
//             <FiPlus className="inline-block mr-2" /> Add New Section
//           </button>
//         </div>
//       </div>

//       <div className="flex justify-between">
//         <button
//           type="button"
//           onClick={() => setStep(1)}
//           className="flex items-center bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 transition-colors"
//         >
//           <FiArrowLeft className="mr-2" /> Back
//         </button>
//         <button
//           type="submit"
//           className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
//         >
//           Publish Course
//         </button>
//       </div>
//     </form>
//   );
// }

// export default CurriculumForm;

// import {
//   FiPlus,
//   FiTrash2,
//   FiVideo,
//   FiArrowLeft,
//   FiCheckCircle,
//   FiLoader,
// } from "react-icons/fi";

// function VideoUploadItem({ video, onRemove }) {
//   const isUploading = video.status === "uploading";
//   const isCompleted = video.status === "completed";

//   return (
//     <div className="mt-2 p-2 bg-slate-100 rounded-md">
//       <div className="flex items-center justify-between text-xs">
//         <p className="truncate pr-2">{video.file.name}</p>
//         <div className="flex items-center">
//           {isUploading && <FiLoader className="animate-spin mr-2" />}
//           {isCompleted && <FiCheckCircle className="text-green-500 mr-2" />}
//           <button
//             type="button"
//             onClick={onRemove}
//             className="text-slate-400 hover:text-red-500"
//           >
//             <FiTrash2 size={14} />
//           </button>
//         </div>
//       </div>
//       {isUploading && (
//         <div className="mt-1 w-full bg-slate-200 rounded-full h-1.5">
//           <div
//             className="bg-indigo-600 h-1.5 rounded-full"
//             style={{ width: `${video.progress}%` }}
//           ></div>
//         </div>
//       )}
//     </div>
//   );
// }

// function CurriculumForm({
//   curriculum,
//   setCurriculum,
//   handleSectionChange,
//   handleSubsectionChange,
//   handleVideoUpload,
//   removeVideo,
//   addSection,
//   removeSection,
//   addSubsection,
//   removeSubsection,
//   handleCurriculumSubmit,
//   setStep,
// }) {
//   return (
//     <form onSubmit={handleCurriculumSubmit} className="mt-8 space-y-8">
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">
//           Course Curriculum
//         </h2>
//         <div className="space-y-6">
//           {curriculum.map((section, secIdx) => (
//             <div
//               key={secIdx}
//               className="bg-slate-50 p-4 rounded-lg border border-slate-200"
//             >
//               <div className="flex items-center justify-between">
//                 <input
//                   type="text"
//                   name="sectionName"
//                   placeholder={`Section ${secIdx + 1}`}
//                   value={section.sectionName}
//                   onChange={(e) => handleSectionChange(secIdx, e)}
//                   className="flex-grow text-lg font-semibold px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeSection(secIdx)}
//                   className="ml-4 text-slate-400 hover:text-red-500"
//                 >
//                   <FiTrash2 size={20} />
//                 </button>
//               </div>

//               <div className="mt-4 pl-4 space-y-4 border-l-2 border-slate-300">
//                 {section.subsections.map((sub, subIdx) => (
//                   <div key={subIdx} className="flex items-start space-x-4">
//                     <div className="flex-grow space-y-2">
//                       <input
//                         type="text"
//                         name="subsectionName"
//                         placeholder={`Lecture ${subIdx + 1}`}
//                         value={sub.subsectionName}
//                         onChange={(e) =>
//                           handleSubsectionChange(secIdx, subIdx, e)
//                         }
//                         className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       />

//                       {/* Video List and Upload Area */}
//                       <div className="space-y-1">
//                         {sub.videos.map((video, videoIdx) => (
//                           <VideoUploadItem
//                             key={videoIdx}
//                             video={video}
//                             onRemove={() =>
//                               removeVideo(secIdx, subIdx, videoIdx)
//                             }
//                           />
//                         ))}
//                       </div>

//                       <div className="flex items-center text-sm text-slate-600">
//                         <FiVideo className="mr-2 text-indigo-500" />
//                         <label
//                           htmlFor={`video-${secIdx}-${subIdx}`}
//                           className="cursor-pointer hover:underline font-medium text-indigo-600"
//                         >
//                           Upload Video(s)
//                         </label>
//                         <input
//                           id={`video-${secIdx}-${subIdx}`}
//                           type="file"
//                           className="sr-only"
//                           onChange={(e) =>
//                             handleVideoUpload(secIdx, subIdx, e.target.files)
//                           }
//                           accept="video/*"
//                           multiple // Allow multiple files
//                         />
//                       </div>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeSubsection(secIdx, subIdx)}
//                       className="text-slate-400 hover:text-red-500 pt-2"
//                     >
//                       <FiTrash2 size={18} />
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => addSubsection(secIdx)}
//                   className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
//                 >
//                   <FiPlus className="mr-1" /> Add Lecture
//                 </button>
//               </div>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addSection}
//             className="cursor-pointer w-full text-center py-3 border-2 border-slate-300 border-dashed rounded-lg text-slate-600 font-semibold hover:bg-slate-100 hover:border-indigo-500"
//           >
//             <FiPlus className="inline-block mr-2" /> Add New Section
//           </button>
//         </div>
//       </div>

//       <div className="flex justify-between">
//         <button
//           type="button"
//           onClick={() => setStep(1)}
//           className="flex items-center bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 transition-colors"
//         >
//           <FiArrowLeft className="mr-2" /> Back
//         </button>
//         <button
//           type="submit"
//           className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
//         >
//           Publish Course
//         </button>
//       </div>
//     </form>
//   );
// }

// export default CurriculumForm;

const countWords = (text) =>
  text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  FiCheckSquare,
  FiSquare,
  FiChevronDown,
  FiChevronUp,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
  FiLoader,
  FiInfo,
  FiMessageSquare,
  FiEdit,
  FiDownload,
} from "react-icons/fi";
import QandASection from "../Components/QandASection";
import useAuthContext from "../../customhooks/useAuthContext";
import { getCoursedetailsByIdAPI } from "../../operation/service/CourseService";

function CoursePlayerPage() {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  // Initialize course as an empty array to match the API response structure for courseContent
  const [course, setCourse] = useState([]);
  const [currentLecture, setCurrentLecture] = useState({
    section: 0,
    lecture: 0,
  });
  const [expandedSections, setExpandedSections] = useState([0]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isPlayerReady, setPlayerReady] = useState(false);
  const [userNote, setUserNote] = useState("");
  // Track completed lectures by their unique _id
  const [completedLectures, setCompletedLectures] = useState([]);

  const [token] = useAuthContext();

  const markTimeoutRef = useRef(null);

  // Fetch course data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCoursedetailsByIdAPI(courseId, token);
        console.log("Fetched course details:", response);
        if (response.status === 200) {
          setTitle(response?.data?.data?.courseName);

          // Transform the API response's courseContent into the desired curriculum structure
          const transformedCurriculum = response?.data?.data?.courseContent.map(
            (section, sectionIndex) => ({
              title: section.sectionName,
              lectures: section.subSection.map(
                (subSection, subSectionIndex) => ({
                  _id: subSection._id, // Ensure _id is included from backend
                  title: subSection.title,
                  duration: subSection.timeDuration + "m", // Assuming timeDuration is in minutes, append 'm'
                  type: subSection.videoUrl ? "video" : "article", // Determine type based on videoUrl presence
                  videoUrl: subSection.videoUrl,
                  overview: subSection.description,
                  resources: [], // API response doesn't contain resources, default to empty
                  qa: [], // API response contains 'comments', but for simplicity, we'll initialize qa as empty. Further mapping needed if comments are to be treated as Q&A.
                })
              ),
            })
          );
          setCourse(transformedCurriculum);

          // Set the initial current lecture if the transformed curriculum has content
          if (
            transformedCurriculum.length > 0 &&
            transformedCurriculum[0].lectures.length > 0
          ) {
            setCurrentLecture({ section: 0, lecture: 0 });
          }
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
        // Handle error, e.g., display an error message to the user
      }
    };
    fetchData();
  }, [courseId, token]); // Depend on courseId and token

  // Reset player readiness and user notes when the current lecture changes
  useEffect(() => {
    // Only update userNote if course has been loaded
    if (course.length > 0) {
      const lecture =
        course?.[currentLecture.section]?.lectures?.[currentLecture.lecture];
      if (lecture) {
        setUserNote(`My personal notes for "${lecture.title}"...`);
      }
    }
    setPlayerReady(false);
  }, [currentLecture, course]);

  const flatLectures = useMemo(() => {
    return course.flatMap((section, sectionIndex) =>
      section.lectures.map((lecture, lectureIndex) => ({
        ...lecture,
        section: sectionIndex,
        lecture: lectureIndex,
      }))
    );
  }, [course]);

  // Count completed lectures by _id
  const completedLecturesCount = useMemo(
    () => flatLectures.filter((l) => completedLectures.includes(l._id)).length,
    [flatLectures, completedLectures]
  );
  const courseProgress = useMemo(
    () =>
      flatLectures.length > 0
        ? Math.round((completedLecturesCount / flatLectures.length) * 100)
        : 0,
    [completedLecturesCount, flatLectures.length]
  );

  const currentFlatIndex = useMemo(() => {
    return flatLectures.findIndex(
      (l) =>
        l.section === currentLecture.section &&
        l.lecture === currentLecture.lecture
    );
  }, [currentLecture, flatLectures]);

  // Safely get the selected lecture
  const selectedLecture = useMemo(() => {
    if (course.length > 0 && currentLecture.section < course.length) {
      const section = course[currentLecture.section];
      if (section && currentLecture.lecture < section.lectures.length) {
        return section.lectures[currentLecture.lecture];
      }
    }
    return null;
  }, [course, currentLecture]);

  const handleNavigation = (direction) => {
    const newIndex = currentFlatIndex + direction;
    if (newIndex >= 0 && newIndex < flatLectures.length) {
      const { section, lecture } = flatLectures[newIndex];
      setCurrentLecture({ section, lecture });
    }
  };

  const handleToggleComplete = () => {
    if (!selectedLecture || !selectedLecture._id) return;
    const isCompleted = completedLectures.includes(selectedLecture._id);
    if (isCompleted) {
      // Remove from completed
      setCompletedLectures((prev) =>
        prev.filter((id) => id !== selectedLecture._id)
      );
    } else {
      // Add to completed
      setCompletedLectures((prev) => [...prev, selectedLecture._id]);
      // Auto-advance if marking as complete
      handleNavigation(1);
    }
  };

  const handleNewQuestion = (newQuestionData) => {
    // Create a deep copy to update the Q&A
    const newCourse = course.map((section, sIdx) => ({
      ...section,
      lectures: section.lectures.map((lecture, lIdx) => {
        if (
          sIdx === currentLecture.section &&
          lIdx === currentLecture.lecture
        ) {
          return { ...lecture, qa: [newQuestionData, ...lecture.qa] };
        }
        return lecture;
      }),
    }));
    setCourse(newCourse);
  };

  async function markedLectureComplete() {
    console.log("Marking lecture as complete:", completedLectures);
    if (completedLectures.length === 0) {
      return;
    }
  }

  function handleLectureSelect(lecture) {
    console.log("Lecture selected:", lecture);
    setCompletedLectures((prev) => {
      console.log("Updated completed lectures:", prev);
      if (!prev.includes(lecture._id)) {
        return [...prev, lecture._id];
      }
      return prev;
    });

    if (markTimeoutRef.current) {
      clearTimeout(markTimeoutRef.current);
    }
    // Set new timeout
    markTimeoutRef.current = setTimeout(() => {
      markedLectureComplete();
    }, 5000);
  }

  return (
    <div className="flex h-screen bg-slate-100">
      <aside
        className={`bg-white shadow-lg h-screen flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "w-80" : "w-0"
        } overflow-hidden`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <Link
            to="/dashboard/my-courses"
            className="flex items-center text-slate-700 hover:text-indigo-600"
          >
            <FiChevronLeft className="mr-2" />
            <h2 className="font-semibold truncate">{title}</h2>
          </Link>
        </div>
        <div className="p-4 border-b">
          <p className="text-sm text-slate-500 mb-1">
            {courseProgress}% Complete
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${courseProgress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {course?.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b">
              <button
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-700 hover:bg-slate-50"
                onClick={() =>
                  setExpandedSections((p) =>
                    p.includes(sectionIndex)
                      ? p.filter((i) => i !== sectionIndex)
                      : [...p, sectionIndex]
                  )
                }
              >
                <span>
                  {sectionIndex + 1}. {section.title}
                </span>
                {expandedSections.includes(sectionIndex) ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>
              {expandedSections.includes(sectionIndex) && (
                <div className="bg-slate-50">
                  {section.lectures.map((lecture, lectureIndex) => (
                    <button
                      key={lectureIndex}
                      className={`w-full flex items-start text-left p-4 text-sm transition-colors
                                                ${
                                                  currentLecture.section ===
                                                    sectionIndex &&
                                                  currentLecture.lecture ===
                                                    lectureIndex
                                                    ? "bg-indigo-100 text-indigo-700"
                                                    : "text-slate-600 hover:bg-slate-200"
                                                }`}
                      onClick={() =>
                        setCurrentLecture({
                          section: sectionIndex,
                          lecture: lectureIndex,
                        })
                      }
                    >
                      {completedLectures.includes(lecture._id) ? (
                        <FiCheckSquare className="mr-3 mt-1 text-indigo-500 flex-shrink-0" />
                      ) : (
                        <FiSquare
                          onClick={() => handleLectureSelect(lecture)}
                          className="mr-3 mt-1 text-slate-400 flex-shrink-0 cursor-pointer"
                        />
                      )}
                      <span>{lecture.title}</span>
                      <span className="ml-auto text-xs text-slate-400 pl-2">
                        {lecture.duration}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen">
        <header className="bg-white p-4 flex items-center justify-between shadow-sm z-10 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-slate-100"
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavigation(-1)}
              disabled={currentFlatIndex === 0}
              className="flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 disabled:text-slate-300 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="mr-1" /> Previous
            </button>
            <button
              onClick={handleToggleComplete}
              className={`flex items-center text-sm font-semibold py-2 px-4 rounded-md transition-colors ${
                selectedLecture &&
                completedLectures.includes(selectedLecture._id)
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {selectedLecture &&
              completedLectures.includes(selectedLecture._id)
                ? "Completed"
                : "Mark as Complete"}{" "}
              <FiCheckSquare className="ml-2 cursor-pointer" />
            </button>
            <button
              onClick={() => handleNavigation(1)}
              disabled={currentFlatIndex === flatLectures.length - 1}
              className="flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 disabled:text-slate-300 disabled:cursor-not-allowed"
            >
              Next <FiChevronRight className="ml-1" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="bg-black aspect-video rounded-lg overflow-hidden relative">
            {!isPlayerReady && selectedLecture?.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <FiLoader className="text-white animate-spin" size={48} />
              </div>
            )}

            {selectedLecture?.type === "video" && selectedLecture?.videoUrl ? (
              <ReactPlayer
                key={selectedLecture?.videoUrl}
                src={selectedLecture?.videoUrl}
                controls={true}
                onReady={() => setPlayerReady(true)}
                style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload", // disables download option
                      disablePictureInPicture: true,
                    },
                  },
                }}
                className="absolute top-0 left-0"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white border rounded-lg">
                <div className="text-center text-slate-600">
                  <FiInfo size={48} className="mx-auto" />
                  <h3 className="mt-4 text-xl font-bold">This is an Article</h3>
                  <p className="mt-2">
                    No video for this lecture. Please see the content below in
                    the "Overview" tab.
                  </p>
                </div>
              </div>
            )}
          </div>

          <h1 className="text-2d md:text-3xl font-bold text-slate-800 mt-6">
            {selectedLecture?.title}
          </h1>

          <div className="mt-6 border-b border-slate-200">
            <nav className="flex space-x-6">
              {[
                { id: "overview", icon: FiInfo },
                { id: "q&a", icon: FiMessageSquare },
                { id: "notes", icon: FiEdit },
                { id: "resources", icon: FiDownload },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer flex items-center py-3 px-1 text-sm font-medium border-b-2 transition-colors
              ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
                >
                  <tab.icon className="mr-2" />
                  <span className="capitalize">{tab.id}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm min-h-[300px]">
            {activeTab === "overview" && (
              <div className="prose max-w-none">
                <p>{selectedLecture?.overview}</p>
              </div>
            )}

            {activeTab === "q&a" &&
              selectedLecture && ( // Ensure selectedLecture exists before passing props
                <QandASection
                  initialQuestions={selectedLecture.qa}
                  onNewQuestion={handleNewQuestion}
                />
              )}

            {activeTab === "notes" && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">My Notes</h3>
                <textarea
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  className="w-full h-64 p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type your notes for this lecture here..."
                />
                <p className="text-xs text-slate-400 mt-2">
                  In a real app, these notes would be saved automatically.
                </p>
              </div>
            )}

            {activeTab === "resources" &&
              selectedLecture && ( // Ensure selectedLecture exists before accessing resources
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Downloadable Resources
                  </h3>
                  {selectedLecture.resources.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedLecture.resources.map((res, i) => (
                        <li key={i}>
                          <a
                            href={res.url}
                            download
                            className="flex items-center text-indigo-600 hover:underline"
                          >
                            <FiDownload className="mr-2" /> {res.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500">
                      No resources available for this lecture.
                    </p>
                  )}
                </div>
              )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CoursePlayerPage;
