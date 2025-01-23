const BASE_URL = process.env.NODE_ENV === 'production'
    ? "https://nucleuset-3jhf.onrender.com/api/v1"  // Your production URL
    : "http://localhost:4001/api/v1";               // Local development URL

export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    LOGOUT_API: BASE_URL + "/auth/logout",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/getAllCategories",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    UPDATE_PROFILE_PICTURE: BASE_URL + "/profile/updatePicture",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourse",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

export const cartEndpoints = {
    ADD_TO_CART_API: BASE_URL + "/cart/addToCart",
    DELETE_FROM_CART: BASE_URL + "/cart/deleteItemFromCart",
    GET_CART_ITEMS: BASE_URL + "/cart/getCartItems",
}

export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/createSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
        BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    PUT_COURSEID_API: BASE_URL + "/course/publishCourse"
}

export const adminEndPoints = {
    CREATE_ANNOUNCEMENT_API: BASE_URL + "/admin/createmessage",
    GET_ALL_ANNOUNCEMENTS_API: BASE_URL + "/admin/sendNotification",
    CREATE_NOTIFICATION_API: BASE_URL + "/admin/createNotifications",
    // GET_ALL_COURSE_API: BASE_URL + "/admin/getAllCourses",
    GET_DRAFT_COURSE: BASE_URL + "/admin/showDraftCourse",
    GET_APPROVE_COURSE: BASE_URL + "/admin/approveCourse",
    GET_ALL_USER_API: BASE_URL + "/admin/getalluser",
}

export const contactUs = {
    CONTACT_US_API: BASE_URL + "/contact/contact-us",
}

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail"
}

export const questionAnswer = {
    CREATE_QUESTION_API: BASE_URL + "/qanda/createQuestion",
    CREATE_REPLY_API: BASE_URL + "/qanda/createReply",
    GET_ALL_QUESTION_API: BASE_URL + "/qanda/getAllQuestions",
    GET_ALL_REPLY_API: BASE_URL + "/qanda/showAllReply",
}
