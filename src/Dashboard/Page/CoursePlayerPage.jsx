import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  FiCheckSquare,
  FiSquare,
  FiChevronDown,
  FiChevronUp,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
  FiLoader,
  FiInfo,
  FiMessageSquare,
  FiEdit,
  FiDownload,
} from "react-icons/fi";
import QandASection from "../Components/QandASection";
import useAuthContext from "../../customhooks/useAuthContext";
import {
  getCoursedetailsByIdAPI,
  markedVideoCompletedAPI,
} from "../../operation/service/CourseService";

function CoursePlayerPage() {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState([]);
  const [currentLecture, setCurrentLecture] = useState({
    section: 0,
    lecture: 0,
  });
  const [expandedSections, setExpandedSections] = useState([0]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isPlayerReady, setPlayerReady] = useState(false);
  const [userNote, setUserNote] = useState("");
  const [completedLectures, setCompletedLectures] = useState([]);

  // Refs to manage API call batching and state in cleanup functions
  const completedLecturesRef = useRef(completedLectures);
  const markTimeoutRef = useRef(null);

  const [token] = useAuthContext();

  // Keep the ref updated with the latest state
  useEffect(() => {
    completedLecturesRef.current = completedLectures;
  }, [completedLectures]);

  // Fetch course data and user progress from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCoursedetailsByIdAPI(courseId, token);
        if (response.status === 200) {
          const { courseDetails, courseProgress } = response?.data?.data;

          setTitle(courseDetails.courseName);
          setCompletedLectures(courseProgress.completedVideos || []);

          // Transform the API response's courseContent into the component's state structure
          const transformedCurriculum = courseDetails.courseContent.map(
            (section) => ({
              title: section.sectionName,
              lectures: section.subSection.map((subSection) => ({
                _id: subSection._id, // Pass the unique ID for tracking
                title: subSection.title,
                duration: subSection.timeDuration + "m",
                type: subSection.videoUrl ? "video" : "article",
                videoUrl: subSection.videoUrl,
                overview: subSection.description,
                resources: [], // Default to empty as not in API
                qa: [], // Default to empty as not in API
              })),
            })
          );
          setCourse(transformedCurriculum);

          // Set the initial current lecture
          if (
            transformedCurriculum.length > 0 &&
            transformedCurriculum[0].lectures.length > 0
          ) {
            setCurrentLecture({ section: 0, lecture: 0 });
          }
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchData();
  }, [courseId, token]);

  // Save progress when the user leaves the page
  useEffect(() => {
    return () => {
      // If a timeout is pending, clear it and save immediately
      if (markTimeoutRef.current) {
        clearTimeout(markTimeoutRef.current);
      }
      markedLectureComplete();
    };
  }, []);

  // Update notes when the lecture changes
  useEffect(() => {
    if (course.length > 0) {
      const lecture =
        course?.[currentLecture.section]?.lectures?.[currentLecture.lecture];
      if (lecture) {
        setUserNote(`My personal notes for "${lecture.title}"...`);
      }
    }
    setPlayerReady(false);
  }, [currentLecture, course]);

  // Memoized calculations for performance
  const flatLectures = useMemo(() => {
    return course.flatMap((section, sectionIndex) =>
      section.lectures.map((lecture, lectureIndex) => ({
        ...lecture,
        section: sectionIndex,
        lecture: lectureIndex,
      }))
    );
  }, [course]);

  const completedLecturesCount = useMemo(
    () => flatLectures.filter((l) => completedLectures.includes(l._id)).length,
    [flatLectures, completedLectures]
  );

  const courseProgress = useMemo(
    () =>
      flatLectures.length > 0
        ? Math.round((completedLecturesCount / flatLectures.length) * 100)
        : 0,
    [completedLecturesCount, flatLectures.length]
  );

  const currentFlatIndex = useMemo(() => {
    return flatLectures.findIndex(
      (l) =>
        l.section === currentLecture.section &&
        l.lecture === currentLecture.lecture
    );
  }, [currentLecture, flatLectures]);

  const selectedLecture = useMemo(() => {
    return flatLectures[currentFlatIndex] || null;
  }, [flatLectures, currentFlatIndex]);

  // Handlers
  const handleNavigation = (direction) => {
    const newIndex = currentFlatIndex + direction;
    if (newIndex >= 0 && newIndex < flatLectures.length) {
      const { section, lecture } = flatLectures[newIndex];
      setCurrentLecture({ section, lecture });
    }
  };

  const markedLectureComplete = async () => {
    const lectureIdsToMark = completedLecturesRef.current;
    if (lectureIdsToMark.length === 0) return;
    try {
      await markedVideoCompletedAPI(courseId, lectureIdsToMark, token);
      console.log("Progress saved successfully.");
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const handleToggleComplete = () => {
    if (!selectedLecture?._id) return;

    const isCompleted = completedLectures.includes(selectedLecture._id);

    setCompletedLectures((prev) =>
      isCompleted
        ? prev.filter((id) => id !== selectedLecture._id)
        : [...prev, selectedLecture._id]
    );

    if (!isCompleted) {
      handleNavigation(1); // Auto-advance only when marking as complete
    }

    // Batch API calls to avoid spamming the server
    if (markTimeoutRef.current) {
      clearTimeout(markTimeoutRef.current);
    }
    markTimeoutRef.current = setTimeout(markedLectureComplete, 5000); // Save after 5s of inactivity
  };

  const handleNewQuestion = (newQuestionData) => {
    const newCourse = course.map((section, sIdx) => ({
      ...section,
      lectures: section.lectures.map((lecture, lIdx) => {
        if (
          sIdx === currentLecture.section &&
          lIdx === currentLecture.lecture
        ) {
          return { ...lecture, qa: [newQuestionData, ...lecture.qa] };
        }
        return lecture;
      }),
    }));
    setCourse(newCourse);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <aside
        className={`bg-white shadow-lg h-screen flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "w-80" : "w-0"
        } overflow-hidden`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <Link
            to="/dashboard/enrolled-courses"
            className="flex items-center text-slate-700 hover:text-indigo-600"
          >
            <FiChevronLeft className="mr-2" />
            <h2 className="font-semibold truncate">{title}</h2>
          </Link>
        </div>
        <div className="p-4 border-b">
          <p className="text-sm text-slate-500 mb-1">
            {courseProgress}% Complete
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${courseProgress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {course?.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b">
              <button
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-700 hover:bg-slate-50"
                onClick={() =>
                  setExpandedSections((p) =>
                    p.includes(sectionIndex)
                      ? p.filter((i) => i !== sectionIndex)
                      : [...p, sectionIndex]
                  )
                }
              >
                <span>
                  {sectionIndex + 1}. {section.title}
                </span>
                {expandedSections.includes(sectionIndex) ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>
              {expandedSections.includes(sectionIndex) && (
                <div className="bg-slate-50">
                  {section.lectures.map((lecture, lectureIndex) => (
                    <button
                      key={lecture._id}
                      className={`w-full flex items-start text-left p-4 text-sm transition-colors ${
                        currentLecture.section === sectionIndex &&
                        currentLecture.lecture === lectureIndex
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-slate-600 hover:bg-slate-200"
                      }`}
                      onClick={() =>
                        setCurrentLecture({
                          section: sectionIndex,
                          lecture: lectureIndex,
                        })
                      }
                    >
                      {completedLectures.includes(lecture._id) ? (
                        <FiCheckSquare className="mr-3 mt-1 text-indigo-500 flex-shrink-0" />
                      ) : (
                        <FiSquare className="mr-3 mt-1 text-slate-400 flex-shrink-0" />
                      )}
                      <span>{lecture.title}</span>
                      <span className="ml-auto text-xs text-slate-400 pl-2">
                        {lecture.duration}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen">
        <header className="bg-white p-4 flex items-center justify-between shadow-sm z-10 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-slate-100"
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavigation(-1)}
              disabled={currentFlatIndex === 0}
              className="flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 disabled:text-slate-300 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="mr-1" /> Previous
            </button>
            <button
              onClick={handleToggleComplete}
              className={`flex items-center text-sm font-semibold py-2 px-4 rounded-md transition-colors ${
                selectedLecture &&
                completedLectures.includes(selectedLecture._id)
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {selectedLecture &&
              completedLectures.includes(selectedLecture._id)
                ? "Completed"
                : "Mark as Complete"}
              <FiCheckSquare className="ml-2" />
            </button>
            <button
              onClick={() => handleNavigation(1)}
              disabled={currentFlatIndex >= flatLectures.length - 1}
              className="flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 disabled:text-slate-300 disabled:cursor-not-allowed"
            >
              Next <FiChevronRight className="ml-1" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="bg-black aspect-video rounded-lg overflow-hidden relative">
            {!isPlayerReady && selectedLecture?.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <FiLoader className="text-white animate-spin" size={48} />
              </div>
            )}

            {selectedLecture?.type === "video" && selectedLecture?.videoUrl ? (
              <ReactPlayer
                key={selectedLecture?.videoUrl}
                url={selectedLecture?.videoUrl}
                controls={true}
                width="100%"
                height="100%"
                onReady={() => setPlayerReady(true)}
                className="absolute top-0 left-0"
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                      disablePictureInPicture: true,
                    },
                  },
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white border rounded-lg">
                <div className="text-center text-slate-600 p-4">
                  <FiInfo size={48} className="mx-auto" />
                  <h3 className="mt-4 text-xl font-bold">
                    {selectedLecture
                      ? "This is an Article"
                      : "Loading Lecture..."}
                  </h3>
                  <p className="mt-2">
                    {selectedLecture
                      ? 'No video for this lecture. Please see the content in the "Overview" tab.'
                      : "Please select a lecture from the sidebar."}
                  </p>
                </div>
              </div>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mt-6">
            {selectedLecture?.title}
          </h1>

          <div className="mt-6 border-b border-slate-200">
            <nav className="flex space-x-6">
              {[
                { id: "overview", icon: FiInfo },
                { id: "q&a", icon: FiMessageSquare },
                { id: "notes", icon: FiEdit },
                { id: "resources", icon: FiDownload },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer flex items-center py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <tab.icon className="mr-2" />
                  <span className="capitalize">{tab.id}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm min-h-[300px]">
            {activeTab === "overview" && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedLecture?.overview }}
              />
            )}

            {activeTab === "q&a" && selectedLecture && (
              <QandASection
                initialQuestions={selectedLecture.qa}
                onNewQuestion={handleNewQuestion}
                courseId={courseId}
                sectionId={currentLecture.section}
                subSection={currentLecture.lecture}
              />
            )}

            {activeTab === "notes" && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">My Notes</h3>
                <textarea
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  className="w-full h-64 p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type your notes for this lecture here..."
                />
                <p className="text-xs text-slate-400 mt-2">
                  Notes are not saved automatically in this version.
                </p>
              </div>
            )}

            {activeTab === "resources" && selectedLecture && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-4">
                  Downloadable Resources
                </h3>
                {selectedLecture.resources?.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedLecture.resources.map((res, i) => (
                      <li key={i}>
                        <a
                          href={res.url}
                          download
                          className="flex items-center text-indigo-600 hover:underline"
                        >
                          <FiDownload className="mr-2" /> {res.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">
                    No resources available for this lecture.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CoursePlayerPage;
