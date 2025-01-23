import { studentEndpoints } from "../apis";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";


const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            // reject(new Error(`Script load failed for the script ${src}`))
            resolve(false);
        }
        document.body.appendChild(script)
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {

    const toastId = toast.loading("Loading....");
    console.log("inside payment api courses : ", courses)
    console.log("inside payment api userDetails : ", userDetails)
    try {
        const script = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!script) {
            toast.error("Razorpay Script Load Failed")
        }

        const buyCourseData = await apiConnector("POST", COURSE_PAYMENT_API,
            { courses },
            { Authorization: `Bearer ${token}` }
        )

        if (!buyCourseData) {
            toast.error("Cration of order failed")
            console.log("Cration of order failed in buyCourseData in PaymentAPI....")
        }
        if (!buyCourseData.data.success) {
            throw new Error(buyCourseData.data.message);
        }
        console.log("buyCourseData inside buy course function : " + JSON.stringify(buyCourseData))

        const options = {
            key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: `${buyCourseData.data.data.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Nucleus",
            description: "Happy Learning",
            image: "https://example.com/your_logo",
            order_id: `${buyCourseData.data.data.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            prefill: {
                name: `${userDetails.name}`,
                email: userDetails.email,
            },
            handler: function (response) {
                // send payment success mail
                sendPaymentSuccess(response, buyCourseData.data.data.amount, token)
                // verify payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            },
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })



    } catch (error) {
        console.log("Failed to buy course" + error)
        toast.error("Failed to buy course")
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccess(response, amount, token) {
    try {

        console.log("INSIDE sendPaymentSuccessEmail IN PAYMENT API....")
        console.log("response, amount, token ", response, amount, token)

        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orederId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        }
        )
    } catch (e) {
        console.log("Failed to send payment success mail" + e)
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    console.log("bodyData, token : " + bodyData, token)
    // dispatch(setPaymentLoading(true));
    try {
        console.log("verifyPayment inside paymentAPI....")
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, you are addded to the course");
        navigate("/dashboard/enrolled-courses");
        // dispatch(resetCart());
    }
    catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    // dispatch(setPaymentLoading(false));
}