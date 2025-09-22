import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiLoader,
} from "react-icons/fi";

import Modal from "../../common/Modal";
import {
  deleteCourseAPI,
  getCoursesManagementAPI,
  updateCourseStatusAPI,
} from "../../../operation/service/AdminService";
import useAuthContext from "../../../customhooks/useAuthContext";

// --- MOCK API RESPONSE ---
// In a real app, this data would be fetched from your backend API.
const mockCourses = [
  {
    _id: "c1",
    courseName: "Introduction to React: The Modern Way",
    instructor: { name: "Jane Smith" },
    category: { name: "Web Development" },
    price: 499,
    studentsEnrolled: 1250,
    status: "Published",
  },
  {
    _id: "c2",
    courseName: "Advanced CSS and Sass",
    instructor: { name: "John Doe" },
    category: { name: "Design" },
    price: 699,
    studentsEnrolled: 850,
    status: "Published",
  },
  {
    _id: "c3",
    courseName: "Python for Data Science",
    instructor: { name: "Emily White" },
    category: { name: "Data Science" },
    price: 999,
    studentsEnrolled: 2500,
    status: "Draft",
  },
  {
    _id: "c4",
    courseName: "UI/UX Design Fundamentals",
    instructor: { name: "Michael Brown" },
    category: { name: "Design" },
    price: 399,
    studentsEnrolled: 600,
    status: "Published",
  },
  {
    _id: "c5",
    courseName: "Node.js: The Complete Guide",
    instructor: { name: "Chris Green" },
    category: { name: "Web Development" },
    price: 899,
    studentsEnrolled: 1800,
    status: "Pending",
  },
];

// --- Helper Components for Styling ---
const StatusBadge = ({ status }) => {
  const styles = {
    Published: "bg-green-100 text-green-800",
    Draft: "bg-slate-100 text-slate-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };
  const icon = {
    Published: <FiCheckCircle />,
    Draft: <FiEdit />,
    Pending: <FiLoader className="animate-spin" />,
  };
  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-0.5 text-xs font-semibold rounded-full ${styles[status]}`}
    >
      {icon[status]} {status}
    </span>
  );
};

// --- Main Page Component ---
function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ category: "All", status: "All" });
  const [modalState, setModalState] = useState({
    isOpen: false,
    course: null,
    action: null,
  });
  const [activeActionMenu, setActiveActionMenu] = useState(null); // To manage which dropdown is open

  const [token] = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCoursesManagementAPI(token);
        console.log("Courses fetched:", response);
        setLoading(false);
        if (response.status === 200) {
          setCourses(response?.data?.data || []);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (course) =>
          filters.category === "All" ||
          course.category.name === filters.category
      )
      .filter(
        (course) => filters.status === "All" || course.status === filters.status
      );
  }, [courses, searchTerm, filters]);

  const openModal = (course, action) => {
    setModalState({ isOpen: true, course, action });
    setActiveActionMenu(null); // Close action menu when modal opens
  };
  const closeModal = () =>
    setModalState({ isOpen: false, course: null, action: null });

  const handleConfirmAction = async () => {
    const { course, action } = modalState;
    console.log(`Performing action: ${action} on course: ${course.courseName}`);

    if (action === "Publish") {
      setLoading(true);
      try {
        const response = await updateCourseStatusAPI(
          token,
          course._id,
          "Published"
        );
        setLoading(false);
        if (response.status === 200) {
          setCourses((prev) =>
            prev.map((c) =>
              c._id === course._id ? { ...c, status: "Published" } : c
            )
          );
        }
      } catch (error) {
        console.error("Error publishing course:", error);
        setLoading(false);
      } finally {
        setLoading(false);
        closeModal();
      }
    }
    if (action === "Delete") {
      setLoading(true);
      try {
        const response = await deleteCourseAPI(token, course._id);
        setLoading(false);
        if (response.status === 200) {
          setCourses((prev) => prev.filter((c) => c._id !== course._id));
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        setLoading(false);
      } finally {
        setLoading(false);
        closeModal();
      }
    }
  };

  const categories = useMemo(
    () => ["All", ...new Set(mockCourses.map((c) => c.category.name))],
    [courses]
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Course Management</h1>
        <p className="text-slate-500">
          Oversee all courses on the Nucleus platform.
        </p>
      </div>

      {/* --- Filter & Action Bar --- */}
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by course name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((p) => ({ ...p, category: e.target.value }))
            }
            className="bg-white border border-slate-300 rounded-md py-2 px-4 w-full"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((p) => ({ ...p, status: e.target.value }))
            }
            className="bg-white border border-slate-300 rounded-md py-2 px-4 w-full"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
          </select>
          <Link
            to="/dashboard/create-course"
            className="flex-shrink-0 flex items-center justify-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            <FiPlus className="mr-2" /> Add Course
          </Link>
        </div>
      </div>

      {/* --- Courses Table --- */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Course Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Instructor
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Enrolled
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <FiLoader className="mx-auto animate-spin text-2xl" />
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => (
                  <tr
                    key={course._id}
                    className="bg-white border-b hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {course.courseName}
                    </td>
                    <td className="px-6 py-4">
                      {course?.instructor?.firstName +
                        " " +
                        course?.instructor?.lastName}
                    </td>
                    <td className="px-6 py-4">{course?.category?.name}</td>
                    <td className="px-6 py-4 text-center">
                      {course?.studentsEnrolled?.length || 0}
                    </td>
                    <td className="px-6 py-4 font-semibold">₹{course.price}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={course.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveActionMenu(
                              activeActionMenu === course._id
                                ? null
                                : course._id
                            )
                          }
                          className="p-2 rounded-full hover:bg-slate-200"
                        >
                          <FiMoreVertical />
                        </button>
                        {activeActionMenu === course._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                            <Link
                              to={`/admin/course/details/${course._id}`}
                              className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                            >
                              <FiEye className="mr-2" /> View
                            </Link>
                            <Link
                              to={`/admin/edit-course/${course._id}`}
                              className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                            >
                              <FiEdit className="mr-2" /> Edit
                            </Link>
                            {course.status !== "Published" && (
                              <button
                                onClick={() => openModal(course, "Publish")}
                                className="flex items-center cursor-pointer w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-slate-100"
                              >
                                <FiCheckCircle className="mr-2" /> Publish
                              </button>
                            )}
                            {course.status === "Published" && (
                              <button
                                onClick={() => openModal(course, "Unpublish")}
                                className="flex items-center cursor-pointer w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-slate-100"
                              >
                                <FiXCircle className="mr-2" /> Unpublish
                              </button>
                            )}
                            <button
                              onClick={() => openModal(course, "Delete")}
                              className="flex items-center w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                            >
                              <FiTrash2 className="mr-2" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Confirmation Modal --- */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        icon={<FiAlertTriangle className="h-8 w-8 text-red-600" />}
        heading={`Confirm ${modalState.action}`}
        text={`Are you sure you want to ${modalState.action?.toLowerCase()} the course "${
          modalState.course?.courseName
        }"?`}
        primaryButtonText={`Yes, ${modalState.action}`}
        onPrimaryClick={handleConfirmAction}
        secondaryButtonText="Cancel"
        onSecondaryClick={closeModal}
      />
    </div>
  );
}

export default CourseManagement;
