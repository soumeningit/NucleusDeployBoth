import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiStar,
  FiGlobe,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiVideo,
  FiFileText,
  FiDownload,
  FiPlayCircle,
  FiClock,
  FiBarChart2,
  FiAlertTriangle,
} from "react-icons/fi";
import { getCourseDetailsAPI } from "../../operation/service/CourseService";
import useAuthContext from "../../customhooks/useAuthContext";
import Modal from "../../components/common/Modal";
import { buyCourse } from "../../operation/service/PaymentService";

function CourseDetailPage() {
  const { courseId } = useParams();
  const [expandedSections, setExpandedSections] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [token] = useAuthContext();

  const navigate = useNavigate();

  const toggleSection = (index) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await getCourseDetailsAPI(courseId);
      console.log("Course details response : ", response);

      if (response.status === 200) {
        setCourseData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const getLectureIcon = () => {
    return <FiPlayCircle className="mr-3 text-slate-500" />;
  };

  if (!courseData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading course details...</p>
      </div>
    );
  }

  async function handleBuyNow() {
    if (!token) {
      setShowModal(true);
      return;
    }
    try {
      await buyCourse(token, courseId, navigate);
    } catch (error) {
      console.log("Error in handle buy now", error);
      toast.error("Error in processing buy now");
    }
  }

  // Calculate rating details
  const averageRating =
    courseData.ratingAndReviews.reduce((acc, curr) => acc + curr.rating, 0) /
      courseData.ratingAndReviews.length || 0;
  const reviewsCount = courseData.ratingAndReviews.length;
  const studentsCount = courseData.studentsEnrolled.length;
  const instructorName = `${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`;

  return (
    <>
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          icon={<FiAlertTriangle className="h-6 w-6 text-indigo-600" />}
          heading="Confirm Login"
          text="To buy a course, you need to be logged in. Please log in to continue."
          primaryButtonText="Log In"
          onPrimaryClick={() => {
            navigate("/sign-in");
          }}
          secondaryButtonText="Cancel"
          onSecondaryClick={() => setShowModal(false)}
        />
      )}
      <div className="bg-slate-50">
        {/* --- Hero Section --- */}
        <header className="bg-slate-800 text-white pt-12 pb-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <p className="text-sm text-indigo-300">
                  {courseData?.category?.name}
                </p>
                <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
                  {courseData?.courseName}
                </h1>
                <p className="mt-4 text-lg text-slate-300">
                  {courseData?.courseDescription}
                </p>
                <div className="flex items-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center">
                    <span className="text-yellow-400 font-bold mr-1">
                      {averageRating.toFixed(1)}
                    </span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          fill={
                            i < Math.round(averageRating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-slate-400 ml-2">
                      ({reviewsCount.toLocaleString()} ratings)
                    </span>
                  </div>
                  <span className="text-slate-400">
                    {studentsCount.toLocaleString()} students
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Created by{" "}
                  <Link
                    to="#"
                    className="text-indigo-300 font-semibold hover:underline"
                  >
                    {instructorName}
                  </Link>
                </p>
                <div className="flex items-center space-x-6 mt-2 text-sm text-slate-400">
                  <span>
                    Last updated{" "}
                    {new Date(courseData.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    <FiGlobe className="inline mr-1" /> English
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- Main Content & Sticky Card --- */}
        <div className="container mx-auto px-6 max-w-7xl -mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content on the left */}
            <div className="lg:col-span-2 space-y-8">
              {/* What you'll learn */}
              <div className="bg-white p-6 border border-slate-200 rounded-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  What you'll learn
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {courseData.whatYouWillLearn.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Curriculum */}
              <div className="bg-white p-6 border border-slate-200 rounded-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Course Content
                </h2>
                <div className="space-y-2">
                  {courseData.courseContent.map((section, index) => (
                    <div
                      key={section._id}
                      className="border border-slate-200 rounded-md"
                    >
                      <button
                        onClick={() => toggleSection(index)}
                        className="cursor-pointer w-full flex justify-between items-center p-4 text-left bg-slate-50 hover:bg-slate-100"
                      >
                        <span className="font-semibold text-slate-800">
                          {section.sectionName}
                        </span>
                        <div className="flex items-center text-sm text-slate-500">
                          <span>{section.subSection.length} lectures</span>
                          {expandedSections.includes(index) ? (
                            <FiChevronUp className="ml-2" />
                          ) : (
                            <FiChevronDown className="ml-2" />
                          )}
                        </div>
                      </button>
                      {expandedSections.includes(index) && (
                        <ul className="p-4 space-y-3">
                          {section.subSection.map((lecture) => (
                            <li
                              key={lecture._id}
                              className="flex items-center text-slate-700"
                            >
                              {getLectureIcon()}
                              <span>{lecture.title}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor Profile */}
              <div className="bg-white p-6 border border-slate-200 rounded-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Instructor
                </h2>
                <div className="flex items-start space-x-6">
                  <img
                    src={courseData?.instructor?.image}
                    alt={instructorName}
                    className="h-28 w-28 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-indigo-600">
                      {instructorName}
                    </h3>
                    {courseData?.instructor?.additionalDetails?.about && (
                      <p className="mt-2 text-slate-600">
                        {courseData?.instructor?.additionalDetails?.about}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Student Reviews */}
              <div className="bg-white p-6 border border-slate-200 rounded-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Student Reviews
                </h2>
                <div className="space-y-6">
                  {courseData.ratingAndReviews.length > 0 ? (
                    courseData.ratingAndReviews.map((review, i) => (
                      <div
                        key={i}
                        className="border-b border-slate-200 pb-6 last:border-b-0"
                      >
                        {/* Structure for reviews would go here */}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500">
                      No reviews yet for this course.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Floating purchase card on the right */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 bg-white rounded-lg shadow-xl overflow-hidden">
                <div
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                >
                  <img
                    src={
                      courseData.thumbnail ||
                      `https://placehold.co/600x400/3B82F6/FFFFFF?text=${encodeURIComponent(
                        courseData.courseName
                      )}`
                    }
                    alt="Course Preview"
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-6">
                  <p className="text-3xl font-extrabold text-slate-800 mb-4">
                    ₹{courseData.price}
                  </p>
                  <div className="space-y-3">
                    <Link
                      to="/cart"
                      className="w-full block text-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Add to Cart
                    </Link>
                    <button
                      onClick={handleBuyNow}
                      className="cursor-pointer w-full bg-slate-100 text-slate-800 font-bold py-3 px-4 rounded-md hover:bg-slate-200 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    30-Day Money-Back Guarantee
                  </p>
                  <div className="mt-6 border-t pt-4">
                    <h4 className="font-semibold text-slate-800 mb-2">
                      This course includes:
                    </h4>
                    {/* This part can be made dynamic if the API provides the data */}
                    <ul className="text-sm text-slate-600 space-y-2">
                      <li className="flex items-center">
                        <FiClock className="mr-2 text-indigo-500" /> On-demand
                        video
                      </li>
                      <li className="flex items-center">
                        <FiFileText className="mr-2 text-indigo-500" /> Articles
                        and notes
                      </li>
                      <li className="flex items-center">
                        <FiDownload className="mr-2 text-indigo-500" />{" "}
                        Downloadable resources
                      </li>
                      <li className="flex items-center">
                        <FiBarChart2 className="mr-2 text-indigo-500" />{" "}
                        Certificate of completion
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetailPage;
