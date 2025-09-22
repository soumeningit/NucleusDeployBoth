import { useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiVideo,
  FiArrowLeft,
  FiCheckCircle,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";

function SubSectionItem({ subsection, onRemove }) {
  const isUploading = subsection.status === "uploading";
  const isCompleted = subsection.status === "completed";
  const hasFailed = subsection.status === "failed";

  return (
    <div className="mt-2 p-2 bg-slate-100 rounded-md">
      <div className="flex items-center justify-between text-sm">
        <p
          className={`truncate pr-2 font-medium ${
            hasFailed ? "text-red-500" : "text-slate-700"
          }`}
        >
          {subsection.title}
        </p>
        <div className="flex items-center gap-2">
          {isUploading && <FiLoader className="animate-spin" />}
          {isCompleted && <FiCheckCircle className="text-green-500" />}
          {hasFailed && (
            <FiAlertCircle className="text-red-500" title="Upload Failed" />
          )}
          <button
            type="button"
            onClick={onRemove}
            className="text-slate-400 hover:text-red-500"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
      {isUploading && (
        <div className="mt-1 w-full bg-slate-200 rounded-full h-1.5">
          <div
            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${subsection.progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

function CurriculumForm({
  curriculum,
  handleSaveSection,
  handleCreateSubsections,
  addSection,
  removeSection,
  removeSubsection,
  setStep,
  handleSectionChange,
  handlePublishCourse,
  loading,
}) {
  const [subSectionTitle, setSubSectionTitle] = useState("");
  const [subSectionTimeline, setSubSectionTimeline] = useState("");

  return (
    <form onSubmit={handlePublishCourse} className="mt-8 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">
          Course Curriculum
        </h2>
        <div className="space-y-6">
          {curriculum.map((section, secIdx) => (
            <div
              key={section._id || secIdx}
              className="bg-slate-50 p-4 rounded-lg border border-slate-200"
            >
              {section.isSaved ? (
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {section.sectionName}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeSection(secIdx)}
                    className="cursor-pointer ml-4 text-slate-400 hover:text-red-500"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="sectionName"
                    placeholder={`New Section Name`}
                    value={section.sectionName}
                    onChange={(e) => handleSectionChange(secIdx, e)}
                    className="flex-grow text-lg font-semibold px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveSection(secIdx)}
                    className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 cursor-pointer"
                    disabled={!section.sectionName}
                  >
                    Save Section
                  </button>
                </div>
              )}

              {section.isSaved && (
                <div className="mt-4 pl-4 pt-4 space-y-2 border-l-2 border-slate-300">
                  {section.subsections.map((sub, subIdx) => (
                    <SubSectionItem
                      key={sub._id || subIdx}
                      subsection={sub}
                      onRemove={() => removeSubsection(secIdx, subIdx)}
                    />
                  ))}
                  <div className="pt-2">
                    <label
                      htmlFor="subSectionTitle"
                      className="text-sm font-medium text-slate-700"
                    >
                      Subsection Title
                    </label>
                    <input
                      id="subSectionTitle"
                      type="text"
                      value={subSectionTitle}
                      onChange={(e) => setSubSectionTitle(e.target.value)}
                      className="mt-1 px-2 py-2 block w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter subsection title. To upload file you must provide name first."
                    />
                  </div>
                  <div className="pt-2">
                    <label
                      htmlFor="subSectionTitle"
                      className="text-sm font-medium text-slate-700"
                    >
                      Subsection Timeline
                    </label>
                    <input
                      id="subSectionTimeline"
                      type="text"
                      value={subSectionTimeline}
                      onChange={(e) => setSubSectionTimeline(e.target.value)}
                      className="mt-1 px-2 py-2 block w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter subsection timeline (time then min for minutes and hr for hours, example: 30min)"
                    />
                  </div>
                  <div className="pt-2">
                    <label
                      htmlFor={`video-upload-${secIdx}`}
                      className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      <FiPlus className="mr-1" /> Upload Lectures (Videos)
                    </label>
                    <input
                      id={`video-upload-${secIdx}`}
                      type="file"
                      className="sr-only"
                      disabled={!subSectionTitle}
                      onChange={(e) =>
                        handleCreateSubsections(
                          secIdx,
                          e.target.files,
                          subSectionTitle,
                          subSectionTimeline
                        )
                      }
                      accept="video/*"
                      multiple
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="w-full text-center py-3 border-2 border-slate-300 border-dashed rounded-lg text-slate-600 font-semibold hover:bg-slate-100 hover:border-indigo-500 cursor-pointer"
          >
            <FiPlus className="inline-block mr-2" /> Add New Section
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors shadow-lg disabled:cursor-not-allowed flex items-center"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin mr-2" /> Loading...
            </>
          ) : (
            "Publish Course"
          )}
        </button>
      </div>
    </form>
  );
}

export default CurriculumForm;
