import { authEndPoints } from "../API";
import { apiConnector } from "../service/apiConnector";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    LOGOUT_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = authEndPoints;

export async function sendOTPAPI(email) {
    try {
        const response = await apiConnector("POST", SENDOTP_API, {
            email
        });

        if (response?.data?.data?.user === -1) {
            toast.error(response.data.message);
            throw new Error("User Already Exists");
        }

        return response;

    } catch (error) {
        throw error;
    }
}

export async function signUpAPI(data) {
    try {
        const response = await apiConnector("POST", SIGNUP_API, {
            ...data
        });

        return response;

    } catch (error) {
        throw error;
    }
}


export async function logInAPI(email, password) {
    try {
        const response = await apiConnector("POST", LOGIN_API, {
            email, password
        });

        return response;

    } catch (error) {
        throw error;
    }
}

export async function logout(token, navigate, setToken, setUser, dispatch) {

    try {
        const response = await apiConnector("POST", LOGOUT_API, {
            token
        });

        if (response?.data?.success === true) {
            // Clear the token and user data from local storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("completedLect");

            // Clear the token and user data from the state
            dispatch(setToken(null));
            dispatch(setUser(null));
            // Notify the user of successful logout
            toast.success("Successfully logged out");

            // Navigate the user to the login page
            navigate("/");
        }
    } catch (error) {
        console.log("Logout Failed.");
        console.log("LOGOUT API ERROR : ", error);
    }
}

export async function resetPasswordToken(email) {
    try {
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {
            email,
        });
        console.log("RESET PASSWORD TOKEN API RESPONSE : ", response);

        return response;

    } catch (e) {
        throw e;
    }

}

export async function resetPasswordAPI(password, confirmPassword, token) {
    try {
        const response = await apiConnector("POST", RESETPASSWORD_API, {
            password,
            confirmPassword,
            token
        });

        return response;

    } catch (e) {
        throw e;
    }
}

