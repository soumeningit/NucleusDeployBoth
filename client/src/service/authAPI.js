import toast from "react-hot-toast";
import { setLoading, setToken } from "../Slices/authSlice";
import { apiConnector } from "./apiConnector";
import { endpoints } from "./apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  LOGOUT_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export async function sendOTP(email, navigate) {
  try {
    const response = await apiConnector("POST", SENDOTP_API, {
      email
    });

    if (response?.data?.data?.user === -1) {
      toast.error(response.data.message);
      throw new Error("User Already Exists");
    }

    if (!response) {
      throw new Error("OTP Send Failed");
    }

    toast.success("OTP sent Successfully");
    navigate("/verify-email");

    // You can return OTP or relevant response if needed
    return response.data.otp;
  } catch (error) {
    toast.error("OTP Send Failed");
    console.error("Send OTP failed!", error);
  } finally {
    setLoading(false);
  }
}

export async function signUp(
  firstName, lastName, email, password,
  confirmPassword, accountType, otp, navigate
) {
  try {
    const response = await apiConnector("POST", SIGNUP_API, {
      firstName, lastName, email, password,
      confirmPassword, accountType, otp,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    if (response.data.message === "User already exsist!") {
      toast.error(response.data.message);
    }

    toast.success("Sign Up Successfull");
    navigate("/login");

  } catch (error) {
    console.log("SIGNUP API ERROR............", error);
    toast.error("Signup Failed");
    navigate("/signup");
  }
}


export async function logIn(email, password, navigate, setToken, setUser, dispatch) {

  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", LOGIN_API, {
      email, password
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    dispatch(setToken(response.data.token));

    const userImage = response.data?.user?.image
      ? response.data.user.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

    dispatch(setUser({ ...response.data.user, image: userImage }));


    navigate(`/dashboard/my-profile/${response?.data?.user?._id}`);
    toast.success("Successfull login");

  } catch (error) {
    toast.dismiss(toastId);
    console.log("LOGIN API ERROR : ", error);
    toast.error("Login Failed");
  } finally {
    toast.dismiss(toastId);
  }
}

export async function logout(token, navigate, setToken, setUser, dispatch) {
  console.log("Inside logout function..");
  console.log("token : ", token);

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

export async function resetPasswordToken(email, setisemailSent) {
  try {
    const response = await apiConnector("POST", RESETPASSTOKEN_API, {
      email,
    });
    console.log("RESET PASSWORD TOKEN API RESPONSE : ", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Reset password token sent to your email");
    setisemailSent(true);

    return response;

  } catch (e) {
    console.log("Reset Password generation failed!");
    console.log("RESET PASSWORD TOKEN API ERROR : ", e);
  }

}

export async function resetPassword(password, confirmPassword, token, navigate) {
  console.log("Inside reset Password..");
  console.log("PASSWORD : ", password, " CONFIRM PASSWORD : ", confirmPassword, " TOKEN : ", token);

  try {
    const response = await apiConnector("POST", RESETPASSWORD_API, {
      password,
      confirmPassword,
      token
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    console.log("Response : ", response);
    toast.success("Password updated successfully");
    navigate("/login");

  } catch (e) {
    toast.error("Password Update Failed");
    console.log("Reset Password generation failed!");
    console.log("RESET PASSWORD TOKEN API ERROR : ", e);
  }
}

