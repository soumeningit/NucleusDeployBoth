import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { profileEndpoints } from "./apis";
import { setUser } from "../Slices/profileSlice";

const { GET_USER_DETAILS_API, UPDATE_PROFILE_PICTURE, } = profileEndpoints;

export function fileUpload(id, formData, token) {
    return async (dispatch) => {
        try {
            console.log("inside fileUplaod function from frontend.");
            // console.log("image", image);
            console.log("image", formData);
            console.log("id", id);
            console.log("token inside fileUplaod function from frontend.", token);
            // const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE, {
            //     id,
            //     formData,
            //     token
            // })

            const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE, formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                    // Authorization: `token`,
                }
            );

            console.log("response inside file upload function : ", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("File Upload successfully")
            dispatch(setUser(response.data.data))

        } catch (error) {
            console.log("error", error);
            toast.error("File Upload Failed")
        }
    }
}