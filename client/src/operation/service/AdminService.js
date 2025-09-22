import { apiConnector } from "./apiConnector";

import { adminEndPoints } from "../API";

const {
    GET_ALL_CATEGORIES_API,
    ADD_CATEGORY_API,
    UPDATE_CATEGORY_API,
    DELETE_CATEGORY_API,
    GET_ALL_USERS_API,
    UPDATE_ACCOUNT_STATUS_API,
    GET_COURSES_MANAGEMENT_API,
    UPDATE_COURSE_STATUS_API,
    DELETE_COURSE_API,
    GET_PAYMENTS_API,
    GET_ADMIN_DASHBOARD_DATA
} = adminEndPoints;

export const getAllCategoriesAPI = async (token) => {
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_CATEGORIES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export const addCategoryAPI = async (token, categoryData) => {
    try {
        const response = await apiConnector(
            "POST",
            ADD_CATEGORY_API,
            categoryData,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateCategoryAPI = async (token, categoryId, categoryData) => {
    try {
        const response = await apiConnector(
            "PUT",
            `${UPDATE_CATEGORY_API}/${categoryId}`,
            categoryData,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteCategoryAPI = async (token, categoryId) => {
    try {
        const response = await apiConnector(
            "DELETE",
            `${DELETE_CATEGORY_API}/${categoryId}`,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAllUsersAPI = async (token) => {
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_USERS_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateAccountStatusAPI = async (token, userId, status) => {
    try {
        const response = await apiConnector(
            "PUT",
            `${UPDATE_ACCOUNT_STATUS_API}/${userId}`,
            { accountStatus: status.toLowerCase() },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getCoursesManagementAPI = async (token) => {
    try {
        const response = await apiConnector(
            "GET",
            GET_COURSES_MANAGEMENT_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateCourseStatusAPI = async (token, courseId, status) => {
    try {
        const response = await apiConnector(
            "PUT",
            `${UPDATE_COURSE_STATUS_API}/${courseId}`,
            { status },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteCourseAPI = async (token, courseId) => {
    try {
        const response = await apiConnector(
            "DELETE",
            `${DELETE_COURSE_API}/${courseId}`,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getPaymentsAPI = async (token) => {
    try {
        const response = await apiConnector(
            "GET",
            GET_PAYMENTS_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAdminDashboardDataAPI = async (token) => {
    try {
        const response = await apiConnector(
            "GET",
            GET_ADMIN_DASHBOARD_DATA,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}
