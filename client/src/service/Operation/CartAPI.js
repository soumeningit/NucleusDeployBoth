import { apiConnector } from "../apiConnector";
import { cartEndpoints } from "../apis";
import toast from "react-hot-toast";

const {
    ADD_TO_CART_API,
    DELETE_FROM_CART,
    GET_CART_ITEMS,
} = cartEndpoints

export async function addToCartAPI(courseIds, token) {

    const toastId = toast.loading("Loading....")
    let result = []
    try {
        console.log("INSIDE ADD TO ACRT API ....")
        console.log("courseIds...." + courseIds);

        const response = await apiConnector("POST", ADD_TO_CART_API, { courseIds }, {
            Authorization: `Bearer ${token}`
        })

        console.log("rsponse inside addToCartAPI : ", response);

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data

    } catch (error) {
        console.log(error)
        toast.error("Can't add course to cart")
    }
    toast.success("Course added to cart successfully.")
    toast.dismiss(toastId);
    return result;
}


export async function deleteFromCartAPI(courseId, token) {

    const toastId = toast.loading("Loading....")
    let result = []
    try {
        console.log("INSIDE REMOVE COURSE FROM CART API ....")
        console.log("courseIds...." + courseId);

        const response = await apiConnector("DELETE", DELETE_FROM_CART, { courseId }, {
            Authorization: `Bearer ${token}`
        })

        console.log("rsponse inside addToCartAPI : ", response);

        if (!response.data.success) {
            throw new Error("DELETE FROM CART ERROR INSIDE API....")
        }
        result = response?.data?.data

    } catch (error) {
        console.log(error)
        toast.error("Can't add course to cart")
    }
    toast.dismiss(toastId);
    return result;
}

