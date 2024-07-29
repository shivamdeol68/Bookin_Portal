import {
    STAFF_LOGIN_REQUEST,
    STAFF_LOGIN_SUCCESS,
    STAFF_LOGOUT_FAILURE,
    STAFF_LOGOUT_REQUEST,
    STAFF_LOGOUT_SUCCESS,
    STAFF_SIGNIN_FAILURE,
    STAFF_SIGNIN_REQUEST,
    STAFF_SIGNIN_SUCCESS,
    STAFF_VERIFY_OTP_FAILURE,
    STAFF_VERIFY_OTP_REQUEST,
    STAFF_VERIFY_OTP_SUCCESS,
  } from "../action/staff";
  
  const initialStatestaff = {
    Staff:[],
    isLoading: false,
    error: null,
  };
  
  const staffReducer = (state = initialStatestaff, action) => {
    switch (action.type) {
      case STAFF_SIGNIN_REQUEST:
      case STAFF_VERIFY_OTP_REQUEST:
      case STAFF_LOGIN_REQUEST:
      case STAFF_LOGOUT_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case STAFF_SIGNIN_SUCCESS:
        return {
          ...state,
          Staff: action.payload,
          isLoading: false,
          error: null,
        };
      case STAFF_LOGIN_SUCCESS:
        return {
          ...state,
          Staff: action.payload.staff,
          isLoading: false,
          error: null,
        };
      case STAFF_VERIFY_OTP_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success:action.payload,
          error: null,
        };
      case STAFF_LOGOUT_SUCCESS:
        return {
          ...state,
          Staff: null,
          isLoading: false,
          error: null,
        };
      case STAFF_SIGNIN_FAILURE:
      case STAFF_VERIFY_OTP_FAILURE:
      case STAFF_LOGOUT_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default staffReducer;
  