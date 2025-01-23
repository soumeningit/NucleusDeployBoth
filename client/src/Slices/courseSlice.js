import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // step: 1,
    courses: null,
    editCourse: false,
    // paymentLoading: false,
    catagory: [],
    loading: false,
    isOpen: true,
    courseId: localStorage.getItem("courseId") ? localStorage.getItem("courseId") : null,
    isFormVisible: false,
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload
        },
        setCourse: (state, action) => {
            state.courses = action.payload
        },
        setEditCourse: (state, action) => {
            state.editCourse = action.payload
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload
        },
        resetCourseState: (state) => {
            state.step = 1
            state.course = null
            state.editCourse = false
        },
        setCatagory: (state, action) => {
            state.catagory = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        setCourseId: (state, action) => {
            state.courseId = action.payload;
        },
        setIsFormVisible: (state, action) => {
            state.isFormVisible = action.payload;
        }

    },
})

export const {
    setStep,
    setCourse,
    setEditCourse,
    setPaymentLoading,
    resetCourseState,
    setCatagory,
    setLoading,
    setIsOpen,
    setCourseId,
    setIsFormVisible

} = courseSlice.actions

export default courseSlice.reducer