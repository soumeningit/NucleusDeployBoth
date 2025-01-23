import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signUpData: null,
    loading: false,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignUpData(state, value) {
            state.signUpData = value.payload
        },
        setLoading(state, value) {
            state.loading = value.payload
        },
        setToken(state, value) {
            state.token = value.payload
            // if (value.payload) {
            //     localStorage.setItem("token", value.payload);
            // } else {
            //     localStorage.removeItem("token");
            // }
        },
    },
})

export const { setSignUpData, setLoading, setToken, setIsLoggedIn, } = authSlice.actions;
export default authSlice.reducer;