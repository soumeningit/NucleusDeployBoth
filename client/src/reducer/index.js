import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "../Slices/authSlice"
import cartSlice from "../Slices/cartSlice"
import profileSlice from "../Slices/profileSlice"
import courseSlice from "../Slices/courseSlice"
import categorySlice from "../Slices/categorySlice"
import viewCourseSlice from "../Slices/viewCourseSlice"

const rootReducer = combineReducers({
    // add reducers here
    auth: authSlice,
    cart: cartSlice,
    profile: profileSlice,
    course: courseSlice,
    category: categorySlice,
    viewCourse: viewCourseSlice
})

export default rootReducer