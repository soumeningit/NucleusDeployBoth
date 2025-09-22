import { profileEndpoints } from "../API";
import { apiConnector } from "./apiConnector";

const {
    GET_USER_DETAILS_API,
    GET_ANALYTICS_API,
    GET_USER_ENROLLED_COURSES_API
} = profileEndpoints;

export const getUserDetailsAPI = async (token) => {
    try {
        const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
            Authorization: `Bearer ${token}`
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAnalyticsAPI = async (token, days) => {
    try {
        const response = await apiConnector("GET", `${GET_ANALYTICS_API}?days=${days}`, null, {
            Authorization: `Bearer ${token}`
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserEnrolledCoursesAPI = async (token) => {
    try {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        });
        return response;
    } catch (error) {
        throw error;
    }
};
