import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetailsByIdAPI } from "../../../../service/CourseAPI";

function CourseDetails() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const response = await getCourseDetailsByIdAPI(courseId, token);
        if (response.status === 200) {
          const data = response?.data?.data;
          setCourse(data);
        }
      } catch (e) {
        console.log("Error fetching course details:", e);
      }
    };
    getCourseDetails();
  }, [courseId, token]);

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen bg-richblue-800 text-white">
        <p>Loading Course Details...</p>
      </div>
    );
  }

  return (
    <div className="bg-richblue-800 text-white min-h-screen px-4 py-8 md:px-12">
      <div className="max-w-4xl mx-auto bg-richblue-900 rounded-2xl p-6 shadow-lg space-y-6">
        <h2 className="text-3xl font-bold">{course.courseName}</h2>
        <p className="text-base">{course.courseDescription}</p>

        <div>
          <h3 className="text-xl font-semibold mb-2">What You Will Learn</h3>
          <ul className="list-disc list-inside space-y-1">
            {course.whatYouWillLearn?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {course.tag?.map((tag, index) => (
              <span
                key={index}
                className="bg-richblue-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Thumbnail</h3>
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt="Course Thumbnail"
              className="rounded-lg w-full max-w-md object-cover"
            />
          ) : (
            <p>No thumbnail available</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold">Price:</h4>
            <p>${course.price}</p>
          </div>
          <div>
            <h4 className="font-semibold">Students Enrolled:</h4>
            <p>{course.studentsEnrolled?.length || 0}</p>
          </div>
          <div>
            <h4 className="font-semibold">Status:</h4>
            <p>{course.status}</p>
          </div>
          <div>
            <h4 className="font-semibold">Rating & Reviews:</h4>
            <p>{course.ratingAndReviews?.length || 0} reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
