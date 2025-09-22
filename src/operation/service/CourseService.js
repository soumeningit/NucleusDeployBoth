import { courseEndpoints } from "../API";
import { apiConnector } from "./apiConnector";

const {
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    PUBLISH_COURSE_API,
    GET_ALL_COURSE_UPDATED_API,
    GET_COURSE_DETAILS_BY_ID_UPDATED_API,
    GET_INSTRUCTOR_ALL_COURSES_API,
    GET_COURSE_DETAILS_FOR_EDIT_API,
    SEARCH_COURSES_API,
    GET_COURSES_BY_CATEGORY_API,
    COURSE_DETAILS_API,
    MARKED_VIDEO_COMPLETED_API,
    GET_COMPLETE_COURSE_DETAILS_API,
    GENERATE_COURSE_CERTIFICATE_API
} = courseEndpoints;

export const createCourseAPI = async (courseData, token) => {
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, courseData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });
        return response;
    } catch (error) {
        console.error("Error creating course:", error);
        throw error;
    }
}

export const createSectionAPI = async (sectionData, token) => {
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, sectionData, {
            Authorization: `Bearer ${token}`,
        });
        return response;
    } catch (error) {
        console.error("Error creating section:", error);
        throw error;
    }
}

export const createSubSectionAPI = async (subSectionData, token, onUploadProgress) => {
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, subSectionData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        }, null, { onUploadProgress });
        return response;
    } catch (error) {
        console.error("Error creating sub-section:", error);
        throw error;
    }
}

export const publishCourseAPI = async (courseId, token) => {
    try {
        console.log("Publishing course with ID:", courseId);
        const response = await apiConnector("POST", PUBLISH_COURSE_API, { courseId }, {
            Authorization: `Bearer ${token}`,
        });
        return response;
    } catch (error) {
        console.error("Error publishing course:", error);
        throw error;
    }
}

export const getAllCoursesUpdatedAPI = async (page, limit) => {
    try {
        let url = `${GET_ALL_COURSE_UPDATED_API}?page=${page}&limit=${limit}`;
        const response = await apiConnector("GET", url);
        return response;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
}

export const getCourseDetailsAPI = async (courseId) => {
    try {
        const response = await apiConnector("GET", `${GET_COURSE_DETAILS_BY_ID_UPDATED_API}?courseId=${courseId}`);
        return response;
    } catch (error) {
        console.error("Error fetching course details:", error);
        throw error;
    }
}

export const getInstructorCoursesAPI = async (token) => {
    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_ALL_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getCourseDetailsForEditAPI = async (courseId, token) => {
    try {
        const response = await apiConnector("GET", `${GET_COURSE_DETAILS_FOR_EDIT_API}?courseId=${courseId}`, null, {
            Authorization: `Bearer ${token}`,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const searchCoursesAPI = async (searchTerm) => {
    try {
        const response = await apiConnector("GET", `${SEARCH_COURSES_API}?query=${encodeURIComponent(searchTerm)}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getCoursesByCategoryAPI = async (categoryId) => {
    try {
        const response = await apiConnector("GET", `${GET_COURSES_BY_CATEGORY_API}?categoryId=${categoryId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getCoursedetailsByIdAPI = async (courseId, token) => {
    try {
        const response = await apiConnector("GET", `${GET_COMPLETE_COURSE_DETAILS_API}?courseId=${courseId}`, null, {
            Authorization: `Bearer ${token}`,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const markedVideoCompletedAPI = async (courseId, completedLectures, token) => {
    try {
        const response = await apiConnector("POST", `${MARKED_VIDEO_COMPLETED_API}`, { courseId, completedLectures }, {
            Authorization: `Bearer ${token}`,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const generateCourseCertificateAPI = async (courseId, token) => {
    try {
        const response = await apiConnector("POST", `${GENERATE_COURSE_CERTIFICATE_API}`, { courseId }, {
            Authorization: `Bearer ${token}`,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

