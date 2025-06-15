import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";
import toast from "react-hot-toast";

const { LECTURE_COMPLETION_API } = courseEndpoints;

export async function courseProgressAPI(data, token) {
    const toastId = toast.loading("Loading")
    let response;
    try {
        console.log("INSIDE COURSE PROGRESS API..")
        console.log("token in videoAPI : ", token, " ")
        console.log("data in videoAPI : ", data);
        response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("response in courseProgressAPI ", response)
        if (!response?.data?.success) {
            throw new Error("Error in courseProgressAPI")
        }
    }
    catch (e) {
        console.log("error in course progress api : " + e)
    }
    toast.dismiss(toastId);
    return response;
}
