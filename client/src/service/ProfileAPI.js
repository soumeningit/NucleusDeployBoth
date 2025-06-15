import { apiConnector } from "./apiConnector";
import { toast } from "react-hot-toast"

const { profileEndpoints } = require("./apis");

const { GET_INSTRUCTOR_DATA_API, GET_USER_DETAILS_BY_ID_API } = profileEndpoints;

export const instructorCoursesData = async (token) => {
    let ans = [];
    const toastId = toast.loading("Loading..");
    try {
        console.log("INSIDE INSTRUCTOR COURSES..");
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`
        });
        ans = response?.data;
        if (!response?.data?.success) {
            throw new Error("Fetch Instructor course details failed")
        }
        console.log("Response in instructorCourse : ", response);
    } catch (error) {
        console.log(error);
        toast.error("Fetch Instructor Course Failed.")
    }
    toast.dismiss(toastId);
    return ans;
}

export const getUserDetailsById = async (token, userId) => {
    try {
        console.log("Fetching user details for userId:", userId);
        const response = await apiConnector("GET", GET_USER_DETAILS_BY_ID_API, null, {
            Authorization: `Bearer ${token}`
        }, { userId });
        if (!response?.data?.success) {
            throw new Error("Fetch User Details Failed");
        }
        return response;
    } catch (error) {
        throw new Error("Fetch User Details Failed");
    }
};
