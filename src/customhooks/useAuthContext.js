import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("User not logged in or AuthContext not found");
    }

    const token = context.data.token;
    const user = context.data.user;
    const addData = context.addData;
    const logout = context.logOutContext;

    return [token, user, addData, logout];

}

export default useAuthContext;