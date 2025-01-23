import toast from "react-hot-toast"
import { apiConnector } from "./apiConnector"
import { settingsEndpoints } from "./apis";
import { setUser } from "../Slices/profileSlice";


const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateAdditionalData(gender, contactNumber, dateOfBirth, about, token) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, {
                gender, contactNumber, dateOfBirth, about
            }, {
                Authorization: `Bearer ${token}`,
            })

            console.log("response : ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUser({ ...response.data.updatedUserDetails }))

            toast.success("Profile Updated Successfully")

        } catch (error) {
            console.log("Updation of additional details failed")
            console.log(error)
            toast.error("Updation of profiles failed")
        }
    }
}