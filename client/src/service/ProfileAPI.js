import { apiConnector } from "./apiConnector";
import { toast } from "react-hot-toast"

const { profileEndpoints } = require("./apis");

const { GET_INSTRUCTOR_DATA_API } = profileEndpoints;

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
