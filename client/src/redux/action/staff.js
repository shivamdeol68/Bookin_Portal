import axios from "axios";
axios.defaults.baseURL="http://localhost:3000";
axios.defaults.withCredentials=true;
import { toast } from "sonner";

// Action types
export const STAFF_SIGNIN_REQUEST = "STAFF_SIGNIN_REQUEST";
export const STAFF_SIGNIN_SUCCESS = "STAFF_SIGNIN_SUCCESS";
export const STAFF_SIGNIN_FAILURE = "STAFF_SIGNIN_FAILURE";
export const STAFF_VERIFY_OTP_REQUEST = "STAFF_VERIFY_OTP_REQUEST";
export const STAFF_VERIFY_OTP_SUCCESS = "STAFF_VERIFY_OTP_SUCCESS";
export const STAFF_VERIFY_OTP_FAILURE = "STAFF_VERIFY_OTP_FAILURE";
export const STAFF_LOGIN_REQUEST = "STAFF_LOGIN_REQUEST";
export const STAFF_LOGIN_SUCCESS = "STAFF_LOGIN_SUCCESS";
export const STAFF_LOGIN_FAILURE = "STAFF_LOGIN_FAILURE";
export const STAFF_LOGOUT_REQUEST = "STAFF_LOGOUT_REQUEST";
export const STAFF_LOGOUT_SUCCESS = "STAFF_LOGOUT_SUCCESS";
export const STAFF_LOGOUT_FAILURE = "STAFF_LOGOUT_FAILURE";



export const signin_staff = (staffData, navigate) => async (dispatch) => {
  dispatch({ type: STAFF_SIGNIN_REQUEST });
  try {
    const res = await axios.post("/api/signin-staff", staffData);
    if (res.data.success) {
      dispatch({ type: STAFF_SIGNIN_SUCCESS, payload: res.data.staff });
      navigate("/Staff-Otp");
    } else {
      dispatch({ type: STAFF_SIGNIN_FAILURE, payload: res.data.message });
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch({ type: STAFF_SIGNIN_FAILURE, payload: error.message });
    toast.error("An error occurred during sign-in");
  }
};

export const verifyOtp_staff = (otp, navigate) => async (dispatch) => {
  dispatch({ type: STAFF_VERIFY_OTP_REQUEST });
  const email = localStorage.getItem("email");
  try {
    const res = await axios.post("/api/VerifyOtp-staff", {otp,email});
    if (res.data.success) {
      dispatch({ type: STAFF_VERIFY_OTP_SUCCESS, payload: res.data.message });
      localStorage.clear();
      navigate("/admin");
    } else {
      dispatch({ type: STAFF_VERIFY_OTP_ERROR, payload: res.data.message });
    }
  } catch (error) {
    dispatch({
      type: STAFF_VERIFY_OTP_ERROR,
      payload: error.response.data.message,
    });
  }
};


  export const login_staff = (staffData,navigate) => async (dispatch) => {
    dispatch({ type: STAFF_LOGIN_REQUEST });
    try {
      const res = await axios.post("/api/login-staff", staffData);
      console.log("res", res.data); 
      if (res.data.success) {
        localStorage.setItem("staff-member", JSON.stringify(res.data.loggedinStaff));
        console.log(res.data.loggedinStaff);
        dispatch({type: STAFF_LOGIN_SUCCESS,  payload: { message: res.data.message, staff: res.data.logedinstaff},
        });
        navigate("/Staff-Chat");
      } else {
        
        dispatch({ type: STAFF_LOGIN_FAILURE, payload: res.data.message });
      
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: STAFF_LOGIN_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
  

  export const logout_staff = () => async (dispatch) => {
    dispatch({ type: STAFF_LOGOUT_REQUEST });
    try {
      localStorage.removeItem("staff-member");
      localStorage.removeItem("staffMessages");
      const res = await axios.post("/api/logout-staff");
      if (res.data.success) {
        dispatch({ type: STAFF_LOGOUT_SUCCESS });
        // Clear user data from localStorage or state if needed
        dispatch({ type: CLEAR_STAFF_DATA }); // Example of clearing staff data from Redux state
      } else {
        dispatch({ type: STAFF_LOGOUT_FAILURE, payload: res.data.message });
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch({ type: STAFF_LOGOUT_FAILURE, payload: error.message });
      toast.error("An error occurred during logout");
    }
  };
  