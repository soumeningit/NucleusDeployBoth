import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserEnrolledCoursesAPI } from "../../operation/service/ProfileService";
import useAuthContext from "../../customhooks/useAuthContext";
import DashboardHeader from "../Components/DashboardHeader";
import { FiCompass, FiLoader } from "react-icons/fi";
import { GrAchievement } from "react-icons/gr";
import { generateCourseCertificateAPI } from "../../operation/service/CourseService";

const CourseCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
    <div className="w-full h-40 bg-slate-200"></div>
    <div className="p-5 space-y-4">
      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
      <div className="h-16 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2 mt-4"></div>
      <div className="h-3 bg-slate-200 rounded w-full"></div>
      <div className="h-10 bg-slate-200 rounded-md w-full mt-2"></div>
    </div>
  </div>
);

const CertificateModal = ({ certificateData, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // This function handles the download logic
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Fetch the image data from the public URL
      const response = await fetch(certificateData.certificateUrl);
      const blob = await response.blob(); // Convert the response to a binary blob

      // Create a temporary local URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Certificate-${certificateData.certificateId}.png`
      );
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link and revoking the temporary URL
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the certificate:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 relative max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Your Certificate
          </h2>
          <div className="h-[85%] mb-4">
            <img
              src={certificateData.certificateUrl}
              alt={`Certificate ID: ${certificateData.certificateId}`}
              className="max-w-full h-[20rem] border-2 border-slate-200 rounded-md shadow-md mx-auto"
            />
          </div>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="cursor-pointer inline-flex items-center justify-center bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <FiLoader className="mr-2 animate-spin" />
                Downloading...
              </>
            ) : (
              "Download Certificate 📥"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [token] = useAuthContext();

  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  async function handleAchievement(course) {
    try {
      setLoading(true);

      const response = await generateCourseCertificateAPI(
        course.courseId,
        token
      );

      if (response.status === 200) {
        setCertificateData(response?.data?.data);
        setShowCertificate(true);
        return;
      }
    } catch (error) {
      console.error("Error unlocking achievement:", error);
    } finally {
      setLoading(false);
    }
  }

  const progress =
    course.totalVideos > 0
      ? Math.round((course.completedVideos / course.totalVideos) * 100)
      : 0;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg flex flex-col">
        <img
          src={course.thumbnail}
          alt={course.courseName}
          className="w-full h-40 object-cover"
        />
        <div className="p-5 flex flex-col flex-grow">
          {/* ++ FIX 1: REMOVED `flex-grow` FROM COURSE TITLE ++ */}
          {/* This prevents the title from pushing other elements out of the card. */}
          <h3 className="text-lg font-bold text-slate-800 truncate">
            {course.courseName}
          </h3>
          <div className="my-4">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-slate-600">
                Progress
              </span>
              <span className="text-xs font-medium text-indigo-600">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          {/* This empty div will grow to push buttons to the bottom */}
          <div className="flex-grow"></div>
          <div className="space-y-2">
            <button
              onClick={() =>
                navigate(`/dashboard/course/learn/${course.courseId}`)
              }
              className="w-full block text-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              {progress === 100 ? "Review Course" : "Continue Learning"}
            </button>
            {progress === 100 && (
              <button
                onClick={() => handleAchievement(course)}
                className="w-full flex items-center justify-center bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors cursor-pointer"
              >
                {loading ? (
                  <>
                    <FiLoader className="mr-2 animate-spin" size={16} />
                    Unlocking...
                  </>
                ) : (
                  <>
                    <GrAchievement className="mr-2" size={16} />
                    Unlock Achievement
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {showCertificate && certificateData && (
        <CertificateModal
          certificateData={certificateData}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </>
  );
};

// ... The rest of your EnrolledCourses component remains unchanged ...
// (The code below is the same as your original file)

function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token] = useAuthContext();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await getUserEnrolledCoursesAPI(token);
        if (response.status === 200) {
          setCourses(response.data.data || []);
        }
      } catch (error) {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [token]);

  return (
    <div>
      <DashboardHeader title="My Courses" />
      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.courseId} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 rounded-lg shadow-sm">
            <FiCompass size={48} className="mx-auto text-slate-400" />
            <h3 className="mt-4 text-xl font-bold text-slate-800">
              Your learning journey awaits!
            </h3>
            <p className="mt-2 text-slate-500">
              You haven't enrolled in any courses yet. Explore our catalog to
              get started.
            </p>
            <Link
              to="/courses"
              className="mt-6 inline-block bg-indigo-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Explore Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnrolledCourses;
