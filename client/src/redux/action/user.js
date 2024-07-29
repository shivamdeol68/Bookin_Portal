import axios from "axios";
axios.defaults.baseURL="http://localhost:3000";
axios.defaults.withCredentials=true;

import { toast } from "sonner";

// Action types
export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const VERIFY_OTP_REQUEST = "VERIFY_OTP_REQUEST";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILURE = "VERIFY_OTP_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";



export const signin = (userData, navigate) => async (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  try {
    const res = await axios.post("/api/signin", userData);
    if (res.data.success) {
      dispatch({ type: SIGNIN_SUCCESS, payload: res.data.user });
      navigate("/verifyOtp");
    } else {
      dispatch({ type: SIGNIN_FAILURE, payload: res.data.message });
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch({ type: SIGNIN_FAILURE, payload: error.message });
    toast.error("An error occurred during sign-in");
  }
};

export const verifyOtp = (otp, navigate) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });
    const email = localStorage.getItem("email");
    try {
      const res = await axios.post("/api/VerifyOtp", {otp,email});
      if (res.data.success) {
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: res.data.message });
        localStorage.clear();
        navigate("/login");
      } else {
        dispatch({ type: VERIFY_OTP_ERROR, payload: res.data.message });
      }
    } catch (error) {
      dispatch({
        type: VERIFY_OTP_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  export const login = (userData, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const res = await axios.post("/api/login", userData);
      console.log("res", res.data);
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.loggedinUser));
        console.log(res.data.loggedinUser);
        dispatch({type: LOGIN_SUCCESS,  payload: { message: res.data.message, user: res.data.loggedinUser},
        });
        navigate("/");
      } else {
        
        dispatch({ type: LOGIN_FAILURE, payload: res.data.message });
      
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
  

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    localStorage.removeItem("user");
    const res = await axios.post("/api/logout");
    if (res.data.success) {
      dispatch({ type: LOGOUT_SUCCESS });
      // Clear user data from localStorage or state if needed
      navigate("/Login");
    } else {
      dispatch({ type: LOGOUT_FAILURE, payload: res.data.message });
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.message });
    toast.error("An error occurred during logout");
  }
};
