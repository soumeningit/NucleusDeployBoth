import { useState, useEffect } from "react";
import DashboardHeader from "../Components/DashboardHeader";
import CourseDetailsForm from "../CreateCourse/CourseDetailsForm";
import CurriculumForm from "../CreateCourse/CurriculumForm";
import TipsCard from "../CreateCourse/TipsCard";
import { getAllCategoriesAPI } from "../../operation/service/CategoryService";
import useAuthContext from "../../customhooks/useAuthContext";
import {
  createCourseAPI,
  createSectionAPI,
  createSubSectionAPI,
  publishCourseAPI,
} from "../../operation/service/CourseService";
import { useNavigate } from "react-router-dom";

function CreateCoursePage() {
  // --- STATE MANAGEMENT WITH REFRESH PERSISTENCE ---
  const [step, setStep] = useState(
    () => JSON.parse(sessionStorage.getItem("courseCreationStep")) || 1
  );
  const [courseId, setCourseId] = useState(
    () => JSON.parse(sessionStorage.getItem("courseCreationId")) || null
  );
  const [details, setDetails] = useState(
    () =>
      JSON.parse(sessionStorage.getItem("courseCreationDetails")) || {
        courseName: "",
        shortDescription: "",
        detailedDescription: "",
        category: "",
        price: "",
      }
  );
  const [tags, setTags] = useState(
    () => JSON.parse(sessionStorage.getItem("courseCreationTags")) || []
  );
  const [prerequisites, setPrerequisites] = useState(
    () => JSON.parse(sessionStorage.getItem("courseCreationPrereqs")) || []
  );
  const [whatYouWillLearn, setWhatYouWillLearn] = useState(
    () => JSON.parse(sessionStorage.getItem("courseCreationLearnings")) || []
  );
  const [curriculum, setCurriculum] = useState(
    () =>
      JSON.parse(sessionStorage.getItem("courseCreationCurriculum")) || [
        { _id: null, sectionName: "", isSaved: false, subsections: [] },
      ]
  );

  // Non-persistent state
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [prerequisiteInput, setPrerequisiteInput] = useState("");
  const [wordCounts, setWordCounts] = useState({ short: 0, detailed: 0 });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [token] = useAuthContext();
  const [loading, setLoading] = useState(false);

  // --- USEEFFECT HOOKS FOR SAVING TO SESSION STORAGE ---
  useEffect(() => {
    sessionStorage.setItem("courseCreationStep", JSON.stringify(step));
  }, [step]);
  useEffect(() => {
    sessionStorage.setItem("courseCreationId", JSON.stringify(courseId));
  }, [courseId]);
  useEffect(() => {
    sessionStorage.setItem("courseCreationDetails", JSON.stringify(details));
  }, [details]);
  useEffect(() => {
    sessionStorage.setItem("courseCreationTags", JSON.stringify(tags));
  }, [tags]);
  useEffect(() => {
    sessionStorage.setItem(
      "courseCreationPrereqs",
      JSON.stringify(prerequisites)
    );
  }, [prerequisites]);
  useEffect(() => {
    sessionStorage.setItem(
      "courseCreationLearnings",
      JSON.stringify(whatYouWillLearn)
    );
  }, [whatYouWillLearn]);
  useEffect(() => {
    const curriculumToSave = curriculum.map((section) => ({
      ...section,
      subsections: section.subsections.map((sub) => ({
        ...sub,
        videoFile: null,
      })), // Don't save File objects
    }));
    sessionStorage.setItem(
      "courseCreationCurriculum",
      JSON.stringify(curriculumToSave)
    );
  }, [curriculum]);

  // --- DATA FETCHING & HANDLERS ---
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getAllCategoriesAPI();
        if (response.status === 200) setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const navigate = useNavigate();

  async function handlePublishCourse(e) {
    e.preventDefault();
    console.log("Publishing course with ID:", courseId);
    if (!courseId) return;
    try {
      setLoading(true);
      const response = await publishCourseAPI(courseId, token);
      setLoading(false);
      if (response.status === 200) {
        Object.keys(sessionStorage).forEach((key) => {
          if (key.startsWith("courseCreation")) sessionStorage.removeItem(key);
        });
        navigate("/dashboard/profile");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error publishing course:", error);
      console.error("Error publishing course:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e, type) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (type === "tag" && tagInput.trim()) {
      if (tags.length < 10 && !tags.includes(tagInput.trim()))
        setTags([...tags, tagInput.trim()]);
      setTagInput("");
    } else if (type === "prerequisite" && prerequisiteInput.trim()) {
      if (!prerequisites.includes(prerequisiteInput.trim()))
        setPrerequisites([...prerequisites, prerequisiteInput.trim()]);
      setPrerequisiteInput("");
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("courseName", details.courseName);
    formData.append("shortDescription", details.shortDescription);
    formData.append("detailedDescription", details.detailedDescription);
    formData.append("category", details.category);
    formData.append("price", details.price);
    formData.append("whatYouWillLearn", JSON.stringify(whatYouWillLearn));
    formData.append("tags", JSON.stringify(tags));
    formData.append("prerequisites", JSON.stringify(prerequisites));
    if (thumbnail) formData.append("thumbnail", thumbnail);
    try {
      const response = await createCourseAPI(formData, token);
      if (response.status === 201) {
        setCourseId(response.data.data);
        setStep(2);
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
    setIsLoading(false);
  };

  const handleSaveSection = async (secIdx) => {
    const sectionData = {
      sectionName: curriculum[secIdx].sectionName,
      courseId: courseId,
    };
    try {
      const response = await createSectionAPI(sectionData, token);
      console.log("Section creation response:", response);
      if (response.status === 201) {
        const updatedCurriculum = [...curriculum];
        const newSection =
          response.data.updateCourseDetails.courseContent.slice(-1)[0];
        updatedCurriculum[secIdx]._id = newSection._id;
        updatedCurriculum[secIdx].sectionName = newSection.sectionName;
        updatedCurriculum[secIdx].isSaved = true;
        setCurriculum(updatedCurriculum);
      }
    } catch (error) {
      console.error("Error saving section:", error);
    }
  };

  const handleCreateSubsections = async (
    secIdx,
    files,
    subSectionTitle,
    subSectionTimeline
  ) => {
    const sectionId = curriculum[secIdx]._id;
    if (!sectionId) return;

    const newSubsections = Array.from(files).map((file) => ({
      _id: `temp_${Date.now()}_${file.name}`,
      title: subSectionTitle,
      timeDuration: subSectionTimeline || "",
      videoFile: file,
      progress: 0,
      status: "uploading",
    }));

    setCurriculum((prev) => {
      const newCurr = [...prev];
      newCurr[secIdx].subsections.push(...newSubsections);
      return newCurr;
    });

    await Promise.all(
      newSubsections.map(async (sub) => {
        try {
          const formData = new FormData();
          formData.append("sectionId", sectionId);
          formData.append("title", sub.title);
          formData.append("video", sub.videoFile);
          formData.append("timeDuration", sub.timeDuration);

          const response = await createSubSectionAPI(
            formData,
            token,
            (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setCurriculum((prev) => {
                const newCurr = [...prev];
                const subToUpdate = newCurr[secIdx]?.subsections.find(
                  (s) => s._id === sub._id
                );
                if (subToUpdate) subToUpdate.progress = progress;
                return newCurr;
              });
            }
          );

          setCurriculum((prev) => {
            const newCurr = [...prev];
            const subToUpdate = newCurr[secIdx]?.subsections.find(
              (s) => s._id === sub._id
            );
            if (subToUpdate) {
              const createdSub = response.data.updateSection.subSection.find(
                (newSub) =>
                  !prev[secIdx].subsections.some(
                    (oldSub) =>
                      oldSub._id === newSub._id && oldSub._id !== sub._id
                  )
              );
              subToUpdate._id = createdSub?._id || sub._id;
              subToUpdate.title = createdSub?.title || sub.title;
              subToUpdate.status = "completed";
            }
            return newCurr;
          });
        } catch (error) {
          console.error("Error creating subsection:", error);
          setCurriculum((prev) => {
            const newCurr = [...prev];
            const subToUpdate = newCurr[secIdx]?.subsections.find(
              (s) => s._id === sub._id
            );
            if (subToUpdate) subToUpdate.status = "failed";
            return newCurr;
          });
        }
      })
    );
  };

  const addSection = () => {
    setCurriculum([
      ...curriculum,
      { _id: null, sectionName: "", isSaved: false, subsections: [] },
    ]);
  };

  const removeSection = (secIdx) => {
    // Note: You should also call an API to delete the section from the DB
    setCurriculum(curriculum.filter((_, index) => index !== secIdx));
  };

  const removeSubsection = (secIdx, subIdx) => {
    // Note: You should also call an API to delete the subsection from the DB
    setCurriculum((prev) => {
      const newCurr = [...prev];
      newCurr[secIdx].subsections.splice(subIdx, 1);
      return newCurr;
    });
  };
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
    }
  };

  const handleDeleteThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const handleSectionChange = (secIdx, e) => {
    const updatedCurriculum = [...curriculum];
    updatedCurriculum[secIdx][e.target.name] = e.target.value;
    setCurriculum(updatedCurriculum);
  };

  const handleSubsectionChange = (secIdx, subIdx, e) => {
    const updatedCurriculum = [...curriculum];
    updatedCurriculum[secIdx].subsections[subIdx][e.target.name] =
      e.target.value;
    setCurriculum(updatedCurriculum);
  };

  return (
    <div>
      <DashboardHeader title="Create a New Course" />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {step === 1 ? (
            <CourseDetailsForm
              {...{
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
              }}
            />
          ) : (
            <CurriculumForm
              {...{
                curriculum,
                setStep,
                handleSaveSection,
                handleCreateSubsections,
                addSection,
                removeSection,
                removeSubsection,
                handleSectionChange,
                handlePublishCourse,
                loading,
              }}
            />
          )}
        </div>
        <div className="lg:col-span-1">
          <TipsCard />
        </div>
      </div>
    </div>
  );
}

export default CreateCoursePage;
