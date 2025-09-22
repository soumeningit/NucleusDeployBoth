import {
  FiLoader,
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiXCircle,
} from "react-icons/fi";
import TagInput from "./TagInput";
import PrerequisiteInput from "./PrerequisiteInput";
import { useState } from "react";

function CourseDetailsForm({
  details,
  setDetails,
  wordCounts,
  setWordCounts,
  categories,
  tags,
  setTags,
  tagInput,
  setTagInput,
  prerequisites,
  setPrerequisites,
  prerequisiteInput,
  setPrerequisiteInput,
  handleKeyDown,
  handleDetailsSubmit,
  isLoading,
  handleThumbnailChange,
  thumbnailPreview,
  whatYouWillLearn,
  setWhatYouWillLearn,
  handleDeleteThumbnail,
}) {
  const [whatYouWillLearnInput, setWhatYouWillLearnInput] = useState("");
  const canAddMoreLearnings = whatYouWillLearn?.length < 5;

  // Find the full category object based on the selected ID in details.
  const selectedCategory =
    Array.isArray(categories) &&
    categories.find((cat) => cat._id === details.category);

  return (
    <form onSubmit={handleDetailsSubmit} className="space-y-8">
      {/* SECTION 1: Course Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">
          Course Information
        </h2>
        <div className="space-y-6">
          <input
            type="text"
            name="courseName"
            value={details.courseName}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, courseName: e.target.value }))
            }
            required
            placeholder="Course Name"
            className="block w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* Short Description */}
          <div>
            <textarea
              name="shortDescription"
              rows="3"
              value={details.shortDescription}
              disabled={wordCounts.short === 100}
              onChange={(e) => {
                setDetails((prev) => ({
                  ...prev,
                  shortDescription: e.target.value,
                }));
                setWordCounts((prev) => ({
                  ...prev,
                  short: e.target.value.trim().split(/\s+/).filter(Boolean)
                    .length,
                }));
              }}
              placeholder="Short Description (max 100 words)"
              className="block w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p
              className={`text-sm text-right mt-1 ${
                wordCounts.short > 100 ? "text-red-500" : "text-slate-400"
              }`}
            >
              {wordCounts.short}/100 words
            </p>
          </div>

          {/* Detailed Description */}
          <div>
            <textarea
              name="detailedDescription"
              rows="6"
              value={details.detailedDescription}
              disabled={wordCounts.short >= 500}
              onChange={(e) => {
                setDetails((prev) => ({
                  ...prev,
                  detailedDescription: e.target.value,
                }));
                setWordCounts((prev) => ({
                  ...prev,
                  detailed: e.target.value.trim().split(/\s+/).filter(Boolean)
                    .length,
                }));
              }}
              placeholder="Detailed Description (max 500 words)"
              className="block w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p
              className={`text-sm text-right mt-1 ${
                wordCounts.detailed > 500 ? "text-red-500" : "text-slate-400"
              }`}
            >
              {wordCounts.detailed}/500 words
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Details & Requirements */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">
          Details & Requirements
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Input */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-slate-600 mb-1"
              >
                Price (₹)
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={details.price || ""}
                onChange={(e) =>
                  setDetails((prev) => ({ ...prev, price: e.target.value }))
                }
                placeholder="e.g., 99.99"
                className="block w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Category Input */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-600 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={details.category}
                onChange={(e) =>
                  setDetails((prev) => ({ ...prev, category: e.target.value }))
                }
                required
                className="block w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Category...</option>
                {Array.isArray(categories) &&
                  categories.length > 0 &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              {/* Show description for the SELECTED category */}
              <p className="text-xs text-slate-500 mt-1 h-4">
                {selectedCategory ? selectedCategory.description : ""}
              </p>
            </div>
          </div>

          {/* What You Will Learn Input (Limited to 5) */}
          <div>
            <label
              htmlFor="whatYouWillLearn"
              className="block text-sm font-medium text-slate-600 mb-1"
            >
              What Student Will Learn ({whatYouWillLearn?.length || 0}/5)
            </label>
            <div className="flex gap-2">
              <input
                id="whatYouWillLearn"
                type="text"
                value={whatYouWillLearnInput}
                onChange={(e) => setWhatYouWillLearnInput(e.target.value)}
                placeholder={
                  canAddMoreLearnings
                    ? "Add a learning outcome"
                    : "Maximum 5 items reached"
                }
                className="flex-grow p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100"
                disabled={!canAddMoreLearnings}
              />
              <button
                type="button"
                onClick={() => {
                  if (
                    whatYouWillLearnInput.trim() !== "" &&
                    canAddMoreLearnings
                  ) {
                    setWhatYouWillLearn([
                      ...whatYouWillLearn,
                      whatYouWillLearnInput.trim(),
                    ]);
                    setWhatYouWillLearnInput("");
                  }
                }}
                className="cursor-pointer bg-indigo-100 text-indigo-700 px-4 rounded-md hover:bg-indigo-200 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
                disabled={!canAddMoreLearnings}
              >
                <FiPlus size={20} />
              </button>
            </div>

            {/* Display for what users will learn */}
            <div className="mt-4 space-y-2">
              {whatYouWillLearn?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-slate-50 p-2 rounded-md"
                >
                  <p className="text-slate-700">{item}</p>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedLearnings = whatYouWillLearn.filter(
                        (_, i) => i !== index
                      );
                      setWhatYouWillLearn(updatedLearnings);
                    }}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <PrerequisiteInput
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            prerequisiteInput={prerequisiteInput}
            setPrerequisiteInput={setPrerequisiteInput}
            handleKeyDown={handleKeyDown}
          />
          <TagInput
            tags={tags}
            setTags={setTags}
            tagInput={tagInput}
            setTagInput={setTagInput}
            handleKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* SECTION 3: Media Uploads (Single Thumbnail) */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">
          Course Thumbnail
        </h2>
        <div className="w-full max-w-md">
          <div className="aspect-video relative border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 hover:border-indigo-500 transition-colors">
            {thumbnailPreview ? (
              <>
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleDeleteThumbnail}
                  className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md text-red-500 hover:text-red-700"
                  title="Remove thumbnail"
                >
                  <FiXCircle size={20} />
                </button>
              </>
            ) : (
              <div className="text-center">
                <FiUploadCloud size={32} className="mx-auto" />
                <p className="mt-2 text-sm">Click to upload an image</p>
                <p className="text-xs text-slate-400">
                  16:9 Aspect ratio recommended
                </p>
              </div>
            )}

            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${
                thumbnailPreview ? "pointer-events-none" : ""
              }`}
            />
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <FiLoader className="animate-spin mr-2" /> Saving...
            </>
          ) : (
            "Save & Continue"
          )}
        </button>
      </div>
    </form>
  );
}

export default CourseDetailsForm;
