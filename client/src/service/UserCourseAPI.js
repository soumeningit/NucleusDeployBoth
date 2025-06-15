import toast from "react-hot-toast";
import { profileEndpoints } from "./apis";
import { apiConnector } from "./apiConnector";
import { setEnrolledCourseFlag } from "../Slices/authSlice";
import { setLoading } from "../Slices/cartSlice";
import { cartEndpoints } from "./apis";

const { GET_USER_ENROLLED_COURSES_API } = profileEndpoints;

const { ADD_TO_CART_API,
    DELETE_FROM_CART,
    GET_CART_ITEMS,
} = cartEndpoints;


export async function getUserEnrolledCourses(token, dispatch) {
    let result = []
    try {
        console.log("inside getUserEnrolledCourses.")
        console.log("token in API : ", token)
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null,
            {
                Authorization: `Bearer ${token}`,
            }
        )

        console.log("Response in getUserEnrolledCourses: ", response);

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data.enrolledCourses.courses

        console.log("result in getUserEnrolledCourses: ", result);
    }
    catch (error) {
        console.log("Fetch of user enrolled course data failed.")
        console.log(error)
        toast.error("Fetch Enrolled Course Failed");
    }

    return result;

}

export async function getCartItems(token, dispatch) {

    let result = [];

    try {
        console.log("inside getCartItems.")
        dispatch(setLoading(true));
        const response = await apiConnector("GET", GET_CART_ITEMS, null,
            {
                Authorization: `Bearer ${token}`,
            }
        )

        console.log("response inside API call.. : ", response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        dispatch(setLoading(false));
        // dispatch(setCartItems(response.data.cartItems));
        toast.success("Cart Item Fetched Successfully")
        result = response.data.cart.courses;



    } catch (error) {
        console.log("Fetch of cart items failed.")
        console.log(error)
        toast.error("Get cart items failed")
    }

    return result;
}