import toast from "react-hot-toast";
import { setLoading, setToken, setIsLoggedIn } from "../Slices/authSlice";
import { apiConnector } from "./apiConnector";
import { endpoints } from "./apis";
import { useSelector } from "react-redux";
import { setUser } from '../Slices/profileSlice'

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  LOGOUT_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOTP(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log("Response  : ", response);
      if (response?.data?.data?.user === -1) {
        toast.error(response.data.message)
        throw new Error("User  Already Exsist");
      }

      if (!response) {
        throw new Error("OTP Send Failed");
      }

      toast.success("OTP sent Successfully")
      navigate("/verify-email")
      // Dispatch an action to update the OTP in the Redux store (if necessary)
      dispatch({ type: 'SEND_OTP_SUCCESS', payload: response.data.otp });

    } catch (error) {
      toast.error("OTP Send Failed")
      console.log("Send OTP failed!")
      console.log(error)
    }

    dispatch(setLoading(false))
  }
}

export function signUp(firstName, lastName, email, password,
  confirmPassword, accountType, otp, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName, lastName, email, password,
        confirmPassword, accountType, otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      if (response.data.message === "User already exsist!") {
        toast.error(response.data.message)
      }

      // console.log("Sign Up Data : ", response);
      toast.success("Sign Up Successfull")
      navigate("/login")

    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false));
  }
}

export function logIn(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email, password
      })

      console.log("Login Response : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setLoading(false))
      dispatch(setToken(response.data.token));
      // dispatch(setUser({ ...response.data.user }));
      // dispatch(setUser({ ...response.data.user }))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))

      // localStorage.setItem("token", JSON.stringify(response.data.token));
      // localStorage.setItem("user", JSON.stringify(response.data.user));

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard/my-profile")
      toast.success("Successfull login")

    } catch (error) {
      console.log("LOGIN API ERROR : ", error)
      toast.error("Login Failed")
      // alert("Wrong Password!")
    }

    dispatch(setLoading(false));
  }
}

export function logout(token, navigate) {
  console.log("Inside logout function..");
  console.log("token : ", token);
  return async (dispatch) => {

    try {
      // Clear the token and user data from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage?.removeItem("completedLect");

      // Clear the token and user data from the state
      dispatch(setToken(null));
      dispatch(setUser(null));
      await apiConnector("POST", LOGOUT_API, {
        token
      })

      // dispatch(setIsLoggedIn(false))

      // Notify the user of successful logout
      toast.success("Successfully logged out");

      // Navigate the user to the login page
      navigate("/");

    } catch (error) {
      console.log("Logout Failed.")
      console.log("LOGOUT API ERROR : ", error)
    }
  }
}

export function resetPassworedToken(email, setisemailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })
      console.log("RESET PASSWORD TOKEN API RESPONSE : ", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset password token sent to your email")
      setisemailSent(true)
      // navigate("/update-password")
    }
    catch (e) {
      console.log("Reset Password generation failed!")
      console.log("RESET PASSWORD TOKEN API ERROR : ", e)
    }

    dispatch(setLoading(false));

  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {

    console.log("Inside reset Password..")
    console.log("PASSWORD : ", password, " CONFIRM PASSWORD : ", confirmPassword, " TOKEN : ", token)
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password, confirmPassword, token
      });

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      console.log("Response : ", response);
      toast.success("Password updated successfully")
      navigate("/login")
    }
    catch (e) {
      toast.error("Password Update Failed")
      console.log("Reset Password generation failed!")
      console.log("RESET PASSWORD TOKEN API ERROR : ", e)
    }

    dispatch(setLoading(false));
    // navigate("/login")
  }
}

