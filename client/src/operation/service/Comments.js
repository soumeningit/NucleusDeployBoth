import toast from 'react-hot-toast'
import { questionAnswer } from '../API';
import { apiConnector } from './apiConnector';

const {
    CREATE_QUESTION_API,
    CREATE_REPLY_API,
    GET_ALL_QUESTION_API,
    GET_ALL_REPLY_API
} = questionAnswer;

export const createMessageAPI = async (data, token) => {

    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", CREATE_QUESTION_API, data, {
            Authorization: `${token}`
        });

        return response;

    } catch (e) {
        toast.error("Comment Failed");
        throw e;
    } finally {
        toast.dismiss(toastId)
    }
}

export const getAllQuestionsAPI = async (token) => {
    const toastId = toast.loading("Loading....")
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_QUESTION_API, null, {
            Authorization: `${token}`
        })

        result = response?.data?.data;
        if (!response.data.success) {
            throw new Error("FAILED IN MESSAGE CREATE API")
        }
    } catch (e) {
        toast.error("Comment Failed");
        console.log("error : " + e)
    }
    toast.dismiss(toastId)
    return result;

}

export const createReply = async (data, token) => {
    const toastId = toast.loading("Loading....")
    let result = [];
    try {
        const response = await apiConnector("POST", CREATE_REPLY_API, data, {
            Authorization: `${token}`
        })
        result = response?.data;
        if (!response.data.success) {
            throw new Error("FAILED IN MESSAGE CREATE API")
        }
    } catch (e) {
        toast.error("Comment Failed");
        console.log("error : " + e)
    }
    toast.dismiss(toastId)
    return result;

}

export const getReply = async (data, token) => {
    const toastId = toast.loading("Loading....")
    let result = [];
    try {
        const response = await apiConnector("POST", GET_ALL_REPLY_API, data, {
            Authorization: `${token}`
        });

        result = response?.data?.data;

        if (!response?.data?.success) {
            throw new Error("FAILED IN GET COMMENT REPLY....");
        }
    } catch (e) {
        toast.error("Comment Failed");
        console.log("error : " + e)
    }

    toast.dismiss(toastId);
    return result;
}