import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllCoursesUpdatedAPI,
  getCoursesByCategoryAPI,
  searchCoursesAPI,
} from "../operation/service/CourseService";
import { getAllCategoriesAPI } from "../operation/service/CategoryService";
import Navbar from "../components/common/Navbar";

// --- Helper Components ---

const CourseCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-slate-200"></div>
    <div className="p-6 space-y-4">
      <div className="h-4 bg-slate-200 rounded w-1/3"></div>
      <div className="h-6 bg-slate-200 rounded w-full"></div>
      <div className="h-16 bg-slate-200 rounded w-full"></div>
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <div className="h-8 bg-slate-200 rounded w-1/4"></div>
        <div className="h-10 bg-slate-200 rounded-md w-1/3"></div>
      </div>
    </div>
  </div>
);

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/course/details/${course._id}`)}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col"
    >
      <img
        className="w-full h-48 object-cover"
        src={course.thumbnail}
        alt={course.courseName}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3
          className="text-xl font-bold text-gray-900 mb-2 truncate"
          title={course.courseName}
        >
          {course.courseName}
        </h3>
        <p className="text-gray-600 text-sm mb-4 h-16 overflow-hidden flex-grow">
          {course.shortDescription || course.courseDescription}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <p className="text-2xl font-bold text-blue-600">₹{course.price}</p>
          <span className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md">
            View Course
          </span>
        </div>
      </div>
    </div>
  );
};

const SearchResults = ({ results, loading, searchTerm, categoryName }) => (
  <div>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-slate-800">Results</h2>
      <p className="text-slate-500">
        {searchTerm && `Showing results for "${searchTerm}".`}
        {categoryName !== "All" &&
          `Showing results in the "${categoryName}" category.`}
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {loading ? (
        <>
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </>
      ) : results.length > 0 ? (
        results.map((course) => <CourseCard key={course._id} course={course} />)
      ) : (
        <div className="col-span-full text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Courses Found
          </h2>
          <p className="text-gray-500 mt-2">
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  </div>
);

// --- Main Page Component ---
function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const PAGE_LIMIT = 6;

  // Debounce effect for the search input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Effect to handle text-based search API calls
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      if (selectedCategory === "All") setIsSearching(false);
      return;
    }

    setSelectedCategory("All");
    setIsSearching(true);
    setSearchLoading(true);

    const fetchSearchResults = async () => {
      try {
        const response = await searchCoursesAPI(debouncedSearchTerm);
        if (response.status === 200) {
          setSearchResults(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setSearchLoading(false);
      }
    };

    if (debouncedSearchTerm.trim() !== "") {
      fetchSearchResults();
    }
  }, [debouncedSearchTerm]);

  // API call for categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await getAllCategoriesAPI();
      if (response.status === 200) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // API call for paginated courses
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllCoursesUpdatedAPI(currentPage, PAGE_LIMIT);
      if (response.status === 200) {
        setCourses(response.data.data);
        setHasMore(response.data.pagination.hasMore);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (!isSearching) {
      fetchCourses();
    }
  }, [currentPage, fetchCourses, isSearching]);

  const handleNextPage = () => {
    if (!loading && hasMore) setCurrentPage((p) => p + 1);
  };
  const handlePrevPage = () => {
    if (!loading && currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // Handler for category selection
  const handleCategorySelect = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchTerm("");

    if (categoryId === "All") {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchLoading(true);
    try {
      const response = await getCoursesByCategoryAPI(categoryId);
      if (response.status === 200) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching courses by category:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const selectedCategoryName =
    categories.find((c) => c._id === selectedCategory)?.name || "All";

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-[4rem]">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Explore Our <span className="text-blue-600">Courses</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Find the perfect course to boost your skills and career.
          </p>
        </div>

        <div className="mb-10 p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:flex-grow">
            <input
              type="text"
              placeholder="Search for any course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isSearching ? (
          <SearchResults
            results={searchResults}
            loading={searchLoading}
            searchTerm={debouncedSearchTerm}
            categoryName={selectedCategoryName}
          />
        ) : (
          <>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-700">
                  No Courses Found
                </h2>
              </div>
            )}

            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-lg font-medium text-gray-800">
                Page {currentPage}
              </span>
              <button
                onClick={handleNextPage}
                disabled={!hasMore || loading}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
