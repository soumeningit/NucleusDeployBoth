import { categoryEndpoints } from "../API";
import { apiConnector } from "./apiConnector";

const {
    GET_ALL_CATEGORIES_API
} = categoryEndpoints;

export const getAllCategoriesAPI = async () => {
    try {
        const response = await apiConnector("GET", GET_ALL_CATEGORIES_API);
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};