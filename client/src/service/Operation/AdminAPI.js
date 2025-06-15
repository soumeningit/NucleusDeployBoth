import { adminEndPoints } from '../apis';
import { toast } from 'react-hot-toast';
import { setLoading } from '../../Slices/profileSlice';
import { apiConnector } from '../apiConnector';

const {
    CREATE_ANNOUNCEMENT_API,
    GET_ALL_ANNOUNCEMENTS_API,
    CREATE_NOTIFICATION_API,
    GET_DRAFT_COURSE,
    GET_APPROVE_COURSE,
    GET_ALL_USER_API
} = adminEndPoints;

export const createMessage = async (data, token, dispatch) => {

    const toastId = toast.loading("Loading...")
    try {
        // console.log("INSIDE CREATE MESSAGE : ")
        // console.log("Inside create message ", "data : ", data, " token : ", token)
        dispatch(setLoading(true));
        const response = await apiConnector("POST", CREATE_ANNOUNCEMENT_API, data, {
            Authorization: `Bearer ${token}`,
        })
        // console.log("CREATE MESSAGE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Create Message Successfully")

        // if anything required add logic here

    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
    // return result
}

export const getMessage = async (data, token, dispatch) => {

    let result = null
    const toastId = toast.loading("Loading...")
    try {
        dispatch(setLoading(true));
        // console.log("ADMIN GETMESSAGE API....")
        // console.log("data : ", data, " token : ", token)
        const response = await apiConnector("GET", GET_ALL_ANNOUNCEMENTS_API, data, {
            Authorization: `Bearer ${token}`,
        })
        // console.log("GET NOTIFICATIONS API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Can not get notifications....")
        }
        toast.success("Message fetched Successfully")

        // if anything required add logic here
        // console.log("response?.data?.data : ", response?.data?.notifications)
        result = response?.data?.notifications

    } catch (error) {
        console.log("GET MESSAGE API ERROR............", error)
        toast.error(error.message)
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
    return result
}

export const createNotificationAPI = async (data, token, dispatch) => {

    let result = []
    const toastId = toast.loading("Loading...")
    try {
        dispatch(setLoading(true));
        // console.log("ADMIN CREATEnOTIFICATION API....")
        // console.log("data : ", data, " token : ", token)
        const response = await apiConnector("POST", CREATE_NOTIFICATION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        // console.log("CREATE NOTIFICATIONS API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Can not get notifications....")
        }
        toast.success("Notification Added Successfully")

        // if anything required add logic here
        result = response.data.data

    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
    return result
}


export const showDraftCourseAPI = async (token, dispatch) => {

    let result = []
    const toastId = toast.loading("Loading...")
    try {
        dispatch(setLoading(true));
        // console.log("ADMIN GET_DRAFT_COURSE API....")
        // console.log(" ADMIN GET_DRAFT_COURSE API token : ", token)
        const response = await apiConnector("GET", GET_DRAFT_COURSE, token, {
            Authorization: `Bearer ${token}`,
        })
        // console.log("CREATE NOTIFICATIONS API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Can not get notifications....")
        }
        toast.success("Course Fetched Successfully")

        // if anything required add logic here
        result = response.data.data

    } catch (error) {
        console.log("GET DRAFT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
    return result
}

export const approveCourseAPI = async (data, token, dispatch) => {

    let result = []
    const toastId = toast.loading("Loading...")
    try {
        dispatch(setLoading(true));
        // console.log("ADMIN GET_DRAFT_COURSE API....")
        // console.log(" ADMIN GET_DRAFT_COURSE API token : ", token, " courseId : ", data)
        const response = await apiConnector("POST", GET_APPROVE_COURSE, data, {
            Authorization: `Bearer ${token}`,
        })
        // console.log("APPROVE COURSE RESPONSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Can not get notifications....")
        }
        toast.success("Course Approved")

        // if anything required add logic here
        result = response.data.data

    } catch (error) {
        console.log("COURSE APPROVE API ERROR............", error)
        toast.error(error.message)
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
    return result
}

export const getAllUser = async (token) => {

    let result = []
    const toastId = toast.loading("Loading...")
    try {
        // console.log("ADMIN GET_ALL_USER API....")
        const response = await apiConnector("GET", GET_ALL_USER_API, null, {
            Authorization: `Bearer ${token}`,
        })
        // console.log("GET ALL USER API............", response)
        if (!response?.data?.success) {
            throw new Error("Can not get all user....")
        }
        toast.success("Success!")

        // if anything required add logic here
        result = response?.data

    } catch (error) {
        console.log("GET ALL USER API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
