import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editCourseDetails,
  getCourseDetailsByIdAPI,
} from "../../../../service/CourseAPI";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";

function EditCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: [],
    tag: [],
    thumbnail: "",
    isImageChange: false,
  });

  const [showImageInput, setShowImageInput] = useState(false);
  const [newThumbnail, setNewThumbnail] = useState(null);

  const [newLearningPoint, setNewLearningPoint] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const response = await getCourseDetailsByIdAPI(courseId, token);
        if (response.status === 200) {
          const data = response?.data?.data;
          setCourse({
            courseName: data.courseName,
            courseDescription: data.courseDescription,
            whatYouWillLearn: data.whatYouWillLearn || [],
            tag: data.tag || [],
            thumbnail: data.thumbnail || "",
          });
        }
      } catch (e) {
        console.log("Error fetching course details:", e);
      }
    };
    getCourseDetails();
  }, [courseId, token]);

  const handleChange = (e) => {
    setCourse((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewThumbnail(file);
  };

  const handleAddLearningPoint = () => {
    if (newLearningPoint.trim() !== "") {
      setCourse((prev) => ({
        ...prev,
        whatYouWillLearn: [...prev.whatYouWillLearn, newLearningPoint.trim()],
      }));
      setNewLearningPoint("");
    }
  };

  const handleRemoveLearningPoint = (index) => {
    setCourse((prev) => ({
      ...prev,
      whatYouWillLearn: prev.whatYouWillLearn.filter((_, i) => i !== index),
    }));
  };

  const handleTagInput = (e) => {
    const value = e.target.value;
    if (value.includes(",") || e.key === "Enter") {
      e.preventDefault();
      const cleanedTag = value.replace(",", "").trim();
      if (cleanedTag) {
        setCourse((prev) => ({
          ...prev,
          tag: [...prev.tag, cleanedTag],
        }));
        setNewTag("");
      }
    } else {
      setNewTag(value);
    }
  };

  const handleRemoveTag = (index) => {
    setCourse((prev) => ({
      ...prev,
      tag: prev.tag.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = new FormData();
    courseData.append("courseName", course.courseName);
    courseData.append("courseDescription", course.courseDescription);
    courseData.append(
      "whatYouWillLearn",
      JSON.stringify(course.whatYouWillLearn)
    );
    courseData.append("tag", JSON.stringify(course.tag));
    if (newThumbnail) {
      courseData.append("thumbnail", newThumbnail);
    }
    courseData.append("isImageChange", course.isImageChange);
    courseData.append("courseId", courseId);

    // console.log("courseData : " + JSON.stringify(courseData));

    for (const key in courseData) {
      console.log("key :" + key + " courseData : " + courseData.get(key));
    }
    try {
      const response = await editCourseDetails(courseData, token, courseId);
      if (response.status === 200) {
        toast.success("Course updated successfully");
        navigate("/dashboard/my-courses");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-richblue-800 p-4 sm:p-8 text-white">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-richblack-900 p-6 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Course</h2>

        {/* Thumbnail Section */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Course Thumbnail
          </label>
          {course.thumbnail && !showImageInput ? (
            <div className="space-y-2">
              <img
                src={course.thumbnail}
                alt="Thumbnail"
                className="h-40 w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  setCourse((prev) => ({
                    ...prev,
                    isImageChange: true,
                  }));
                  setShowImageInput(true);
                }}
                className="text-sm text-yellow-400 underline"
              >
                Change Image
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-white bg-richblack-700 border border-richblack-600 rounded px-3 py-2 w-full"
            />
          )}
        </div>

        {/* Course Name */}
        <div>
          <label
            htmlFor="courseName"
            className="block text-sm font-medium mb-1"
          >
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={course.courseName}
            onChange={handleChange}
            className="bg-richblack-700 border border-richblack-600 rounded px-3 py-2 w-full text-white"
          />
        </div>

        {/* Course Description */}
        <div>
          <label
            htmlFor="courseDescription"
            className="block text-sm font-medium mb-1"
          >
            Course Description
          </label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            rows={4}
            value={course.courseDescription}
            onChange={handleChange}
            className="bg-richblack-700 border border-richblack-600 rounded px-3 py-2 w-full text-white"
          />
        </div>

        {/* What You Will Learn */}
        <div>
          <label className="block text-sm font-medium mb-1">
            What You Will Learn
          </label>
          <ul className="space-y-2 mb-2">
            {course.whatYouWillLearn.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span>{item}</span>
                <IoRemoveCircleOutline
                  className="text-red-400 cursor-pointer"
                  onClick={() => handleRemoveLearningPoint(index)}
                />
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              type="text"
              value={newLearningPoint}
              onChange={(e) => setNewLearningPoint(e.target.value)}
              placeholder="Add a learning point"
              className="bg-richblack-700 border border-richblack-600 rounded px-3 py-2 w-full text-white"
            />
            <button
              type="button"
              onClick={handleAddLearningPoint}
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
            >
              Add
            </button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {course.tag.map((tag, index) => (
              <span
                key={index}
                className="flex items-center bg-yellow-400 text-black px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <AiOutlineClose
                  className="ml-1 cursor-pointer"
                  onClick={() => handleRemoveTag(index)}
                />
              </span>
            ))}
          </div>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleTagInput}
            placeholder="Type and press Enter or comma"
            className="bg-richblack-700 border border-richblack-600 rounded px-3 py-2 w-full text-white"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition duration-200"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCourse;
