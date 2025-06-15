import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
}

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
            // state.cart.push(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;