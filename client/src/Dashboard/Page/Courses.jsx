import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../Components/DashboardHeader";
import { FiBookOpen, FiPlus } from "react-icons/fi";
import useAuthContext from "../../customhooks/useAuthContext";
import { getInstructorCoursesAPI } from "../../operation/service/CourseService";

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg flex flex-col">
    <img
      src={
        course.thumbnail ||
        `https://placehold.co/600x400/3B82F6/FFFFFF?text=${course.courseName}`
      }
      alt={course.courseName}
      className="w-full h-40 object-cover"
    />
    <div className="p-5 flex flex-col flex-grow">
      <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 self-start">
        {course.category?.name}
      </span>
      <h3 className="text-lg font-bold text-slate-800 truncate">
        {course.courseName}
      </h3>
      <p className="text-sm text-slate-500 mb-4 flex-grow">
        by {`${course.instructor?.firstName} ${course.instructor?.lastName}`}
      </p>
      <Link
        to={`/dashboard/edit-course/${course._id}`}
        className="w-full block text-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        View Course
      </Link>
    </div>
  </div>
);

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token] = useAuthContext();

  useEffect(() => {
    async function fetchCourses(authToken) {
      if (!authToken) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await getInstructorCoursesAPI(authToken);
        if (response.status === 200) {
          setCourses(response.data.data || []);
        }
      } catch (error) {
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses(token);
  }, [token]);

  return (
    <div>
      <DashboardHeader title="My Courses" />
      <div className="mt-8">
        {isLoading ? (
          <div className="text-center p-12">
            <p>Loading your courses...</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 rounded-lg shadow-sm">
            <FiBookOpen size={48} className="mx-auto text-slate-400" />
            <h3 className="mt-4 text-xl font-bold text-slate-800">
              You haven't created any courses yet.
            </h3>
            <p className="mt-2 text-slate-500">
              Let's get started and create your first course to share your
              knowledge.
            </p>
            <Link
              to="/dashboard/create-course"
              className="mt-6 inline-flex items-center bg-indigo-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-indigo-700 transition-colors"
            >
              <FiPlus className="mr-2" /> Create New Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
