import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import useAuthContext from "../customhooks/useAuthContext";
import { getCourseDetailsForEditAPI } from "../operation/service/CourseService";

import {
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiX,
  FiLoader,
  FiVideo,
} from "react-icons/fi";
import DashboardHeader from "../Dashboard/Components/DashboardHeader";

// Helper to calculate word count
const countWords = (text) =>
  text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

function EditCourse() {
  const { courseId } = useParams();
  const [token] = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [courseData, setCourseData] = useState(null);

  // States for dynamic inputs
  const [tagInput, setTagInput] = useState("");
  const [prerequisiteInput, setPrerequisiteInput] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const thumbnailInputRef = useRef(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    async function fetchCourseDetails() {
      if (!courseId || !token) return;
      setLoading(true);
      try {
        const response = await getCourseDetailsForEditAPI(courseId, token);
        if (response.status === 200) {
          const data = response.data.data;
          setCourseData({
            courseName: data.courseName || "",
            shortDescription: data.shortDescription || "",
            detailedDescription: data.courseDescription || "",
            category: data.category?._id || "",
            thumbnailFile: null,
            price: data?.price,
            thumbnailUrl: data.thumbnail || "",
            tags: data.tag || [],
            prerequisites: data.instructions || [],
            sections:
              data.courseContent.map((section) => ({
                ...section,
                subsections: section.subSection.map((sub) => ({
                  ...sub, // Keep existing data like _id
                  subsectionName: sub.title,
                  videoFile: null,
                })),
              })) || [],
          });
          setThumbnailPreview(data.thumbnail);
        }
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (courseData === null) fetchCourseDetails();
  }, [courseId, token]);

  // --- STATE HANDLERS ---
  const handleInputChange = (e) =>
    setCourseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData((prev) => ({ ...prev, thumbnailFile: file }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleKeyDown = (e, type) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (type === "tag" && tagInput.trim()) {
      if (
        courseData.tags.length < 10 &&
        !courseData.tags.includes(tagInput.trim())
      ) {
        setCourseData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    } else if (type === "prerequisite" && prerequisiteInput.trim()) {
      if (!courseData.prerequisites.includes(prerequisiteInput.trim())) {
        setCourseData((prev) => ({
          ...prev,
          prerequisites: [...prev.prerequisites, prerequisiteInput.trim()],
        }));
      }
      setPrerequisiteInput("");
    }
  };

  const removeTag = (tagToRemove) =>
    setCourseData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  const removePrerequisite = (prereqToRemove) =>
    setCourseData((prev) => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((p) => p !== prereqToRemove),
    }));

  // --- CURRICULUM HANDLERS ---
  const handleSectionChange = (index, e) => {
    const newSections = [...courseData.sections];
    newSections[index].sectionName = e.target.value;
    setCourseData((prev) => ({ ...prev, sections: newSections }));
  };
  const addSection = () => {
    setCourseData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          sectionName: "",
          subsections: [{ subsectionName: "", videoFile: null }],
        },
      ],
    }));
  };
  const removeSection = (index) => {
    setCourseData((prev) => ({
      ...prev,
      sections: courseData.sections.filter((_, i) => i !== index),
    }));
  };
  const handleSubsectionChange = (secIdx, subIdx, e) => {
    const newSections = [...courseData.sections];
    newSections[secIdx].subsections[subIdx].subsectionName = e.target.value;
    setCourseData((prev) => ({ ...prev, sections: newSections }));
  };
  const handleVideoChange = (secIdx, subIdx, e) => {
    const file = e.target.files[0];
    const newSections = [...courseData.sections];
    newSections[secIdx].subsections[subIdx].videoFile = file;
    setCourseData((prev) => ({ ...prev, sections: newSections }));
  };
  const addSubsection = (secIdx) => {
    const newSections = [...courseData.sections];
    newSections[secIdx].subsections.push({
      subsectionName: "",
      videoFile: null,
    });
    setCourseData((prev) => ({ ...prev, sections: newSections }));
  };
  const removeSubsection = (secIdx, subIdx) => {
    const newSections = [...courseData.sections];
    newSections[secIdx].subsections = newSections[secIdx].subsections.filter(
      (_, i) => i !== subIdx
    );
    setCourseData((prev) => ({ ...prev, sections: newSections }));
  };

  // --- FORM SUBMISSION ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    // In a real app, you would use FormData to handle file uploads and send all `courseData`
    console.log("Submitting updated course data:", courseData);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
    setSaving(false);
    alert("Course updated successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FiLoader className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="text-center p-12">
        Could not load course data. Please try again.
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader title="Edit Course" />

      <form onSubmit={handleFormSubmit} className="mt-8 space-y-8">
        {/* --- Card 1: Basic Information --- */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 border-b border-gray-400 pb-4 mb-6">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2">
              <label
                htmlFor="courseName"
                className="block text-sm font-medium text-slate-700"
              >
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={courseData.courseName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
              />
            </div>
            <div>
              <label
                htmlFor="shortDescription"
                className="block text-sm font-medium text-slate-700"
              >
                Short Description
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows="4"
                value={courseData.shortDescription}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label
                htmlFor="detailedDescription"
                className="block text-sm font-medium text-slate-700"
              >
                Detailed Description
              </label>
              <textarea
                id="detailedDescription"
                name="detailedDescription"
                rows="4"
                value={courseData.detailedDescription}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* --- Card 2: Details & Thumbnail --- */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 border-b border-gray-400 pb-4 mb-6">
            Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={courseData.category}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400"
              >
                <option value="">Select a category...</option>
                <option value="68cac6a84918a71a2ac901df">AI</option>
                <option value="668b02b2a53adbe71a601287">
                  Web Development
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Course Thumbnail
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail"
                  className="h-20 w-32 object-cover rounded-md bg-slate-100"
                />
                <button
                  type="button"
                  onClick={() => thumbnailInputRef.current.click()}
                  className="bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-md hover:bg-slate-200 text-sm cursor-pointer"
                >
                  Change Image
                </button>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  className="sr-only"
                  onChange={handleThumbnailChange}
                  accept="image/*"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tags (max 10)
              </label>
              <div className="flex flex-wrap items-center gap-2 p-2 border border-slate-300 rounded-md">
                {courseData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center bg-indigo-100 text-indigo-700 text-sm font-medium px-2 py-1 rounded-full"
                  >
                    {tag}{" "}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1.5"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, "tag")}
                  placeholder={
                    courseData.tags.length < 10 ? "Add tag..." : "Max tags"
                  }
                  disabled={courseData.tags.length >= 10}
                  className="flex-grow bg-transparent focus:outline-none text-sm p-1 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Prerequisites
              </label>
              <div className="flex flex-wrap items-center gap-2 p-2 border border-slate-300 rounded-md">
                {courseData.prerequisites.map((p) => (
                  <span
                    key={p}
                    className="flex items-center bg-slate-200 text-slate-700 text-sm font-medium px-2 py-1 rounded-full"
                  >
                    {p}{" "}
                    <button
                      type="button"
                      onClick={() => removePrerequisite(p)}
                      className="ml-1.5"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={prerequisiteInput}
                  onChange={(e) => setPrerequisiteInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, "prerequisite")}
                  placeholder="Add prerequisite..."
                  className="flex-grow bg-transparent focus:outline-none text-sm p-1 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Card 3: Curriculum --- */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 border-b border-gray-400 pb-4 mb-6">
            Curriculum
          </h2>
          <div className="space-y-6">
            {courseData.sections.map((section, secIdx) => (
              <div
                key={secIdx}
                className="bg-slate-50 p-4 rounded-lg border border-slate-200"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    name="sectionName"
                    placeholder={`Section ${secIdx + 1}`}
                    value={section.sectionName}
                    onChange={(e) => handleSectionChange(secIdx, e)}
                    className="flex-grow text-lg font-semibold px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => removeSection(secIdx)}
                    className="ml-4 text-slate-400 hover:text-red-500 cursor-pointer"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
                <div className="mt-4 pl-4 space-y-4 border-l-2 border-slate-300">
                  {section.subsections.map((sub, subIdx) => (
                    <div key={subIdx} className="flex items-start space-x-4">
                      <div className="flex-grow space-y-2">
                        <input
                          type="text"
                          name="subsectionName"
                          placeholder={`Lecture ${subIdx + 1}`}
                          value={sub.subsectionName}
                          onChange={(e) =>
                            handleSubsectionChange(secIdx, subIdx, e)
                          }
                          className="w-full text-sm px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                        <div className="flex items-center text-sm text-slate-600">
                          <FiVideo className="mr-2 text-indigo-500" />
                          <label
                            htmlFor={`video-${secIdx}-${subIdx}`}
                            className="cursor-pointer hover:underline"
                          >
                            {sub.videoFile
                              ? sub.videoFile.name
                              : sub.videoUrl?.split("/").pop() ||
                                "Upload Video"}
                          </label>
                          <input
                            id={`video-${secIdx}-${subIdx}`}
                            type="file"
                            className="sr-only"
                            onChange={(e) =>
                              handleVideoChange(secIdx, subIdx, e)
                            }
                            accept="video/*"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSubsection(secIdx, subIdx)}
                        className="text-slate-400 hover:text-red-500 pt-2 cursor-pointer"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addSubsection(secIdx)}
                    className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    <FiPlus className="mr-1" /> Add Lecture
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addSection}
              className="w-full text-center py-3 border-2 border-slate-300 border-dashed rounded-lg text-slate-600 font-semibold hover:bg-slate-100 cursor-pointer"
            >
              <FiPlus className="inline-block mr-2" /> Add Section
            </button>
          </div>
        </div>

        {/* --- Final Submit Button --- */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors shadow-lg disabled:bg-green-400 flex items-center cursor-pointer"
          >
            {saving ? (
              <>
                <FiLoader className="animate-spin mr-2" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCourse;
