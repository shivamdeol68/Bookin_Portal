import axios from "axios";
axios.defaults.baseURL="http://localhost:3000";
axios.defaults.withCredentials=true;

import { toast } from "sonner";


// Action types
export const ADMIN_SIGNIN_REQUEST = "ADMIN_SIGNIN_REQUEST";
export const ADMIN_SIGNIN_SUCCESS = "ADMIN_SIGNIN_SUCCESS";
export const ADMIN_SIGNIN_FAILURE = "ADMIN_SIGNIN_FAILURE";
export const ADMIN_VERIFY_OTP_REQUEST = "ADMIN_VERIFY_OTP_REQUEST";
export const ADMIN_VERIFY_OTP_SUCCESS = "ADMIN_VERIFY_OTP_SUCCESS";
export const ADMIN_VERIFY_OTP_FAILURE = "ADMIN_VERIFY_OTP_FAILURE";
export const ADMIN_LOGIN_REQUEST = "ADMIN_LOGIN_REQUEST";
export const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
export const ADMIN_LOGIN_FAILURE = "ADMIN_LOGIN_FAILURE";
export const ADMIN_LOGOUT_REQUEST = "ADMIN_LOGOUT_REQUEST";
export const ADMIN_LOGOUT_SUCCESS = "ADMIN_LOGOUT_SUCCESS";
export const ADMIN_LOGOUT_FAILURE = "ADMIN_LOGOUT_FAILURE";
export const ADMIN_DATA_REQUEST = "ADMIN_DATA_REQUEST";
export const ADMIN_DATA_SUCCESS = "ADMIN_DATA_SUCCESS";
export const ADMIN_DATA_FAILURE = "ADMIN_DATA_FAILURE";



export const admin_signin = (userData, navigate) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNIN_REQUEST });
  try {
    const res = await axios.post("/api/Admin-signin", userData);
    console.log(res.data,"res-signinadmin");
    if (res.data.success) {
      dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: ({message:res.data.message,success:true}) });
      navigate("/Admin-Otp");
    } else {
      dispatch({ type: ADMIN_SIGNIN_FAILURE, payload: res.data.message });
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch({ type: ADMIN_SIGNIN_FAILURE, payload: error.message });
    toast.error("An error occurred during sign-in");
  }
};

export const admindata = () => async (dispatch) => {
  dispatch({ type: ADMIN_DATA_REQUEST });
  try {
    const res = await axios.get("/api/admin");
    console.log(res.data);
    if (res.data.success) {
      dispatch({ type: ADMIN_DATA_SUCCESS, payload:{admindata: res.data.admin[0],message:"Admin is here"} });
    }
  } catch (error) {
    dispatch({ type: ADMIN_DATA_FAILURE, payload: error.message });
  }
};


export const admin_verifyOtp = (otp, navigate) => async (dispatch) => {
    dispatch({ type: ADMIN_VERIFY_OTP_REQUEST });
    const email = localStorage.getItem("email");
    try {
      const res = await axios.post("/api/Admin-Verification-Otp", {otp,email});
      if (res.data.success) {
        dispatch({ type: ADMIN_VERIFY_OTP_SUCCESS, payload: res.data.message });
        localStorage.clear();
        navigate("/Admin-login");
      } else {
        dispatch({ type: ADMIN_VERIFY_OTP_FAILURE, payload: res.data.message });
      }
    } catch (error) {
      dispatch({
        type:ADMIN_VERIFY_OTP_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

  export const admin_login = (adminData,navigate) => async (dispatch) => {
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    try {
      const res = await axios.post("/api/Admin-login", adminData);
      console.log("res", res.data);
      if (res.data.success) {
        localStorage.setItem("admin", JSON.stringify(res.data.savedAdmin));
        console.log(res.data.savedAdmin);
        dispatch({type: ADMIN_LOGIN_SUCCESS,  payload: { message: res.data.message, admindata: res.data.savedAdmin},
        });
        navigate("/admin");
      } else {
        
        dispatch({ type: ADMIN_LOGIN_FAILURE, payload: res.data.message });
      
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADMIN_LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };
  

  export const admin_logout = (navigate) => async (dispatch) => {
    dispatch({ type: ADMIN_LOGOUT_REQUEST });
    try {
      localStorage.removeItem("admin"); // Remove only the admin_token from local storage
      const res = await axios.post("/api/Admin-logout");
      if (res.data.success) {
        dispatch({ type: ADMIN_LOGOUT_SUCCESS });
        // Clear user data from localStorage or state if needed
        navigate("/Admin-login");
      } else {
        dispatch({ type: ADMIN_LOGOUT_FAILURE, payload: res.data.message });
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch({ type: ADMIN_LOGOUT_FAILURE, payload: error.message });
      toast.error("An error occurred during logout");
    }
  };
  
