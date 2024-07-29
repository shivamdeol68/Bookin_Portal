import {
  ADMIN_DATA_FAILURE,
  ADMIN_DATA_REQUEST,
  ADMIN_DATA_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT_FAILURE,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_SIGNIN_FAILURE,
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_VERIFY_OTP_FAILURE,
  ADMIN_VERIFY_OTP_REQUEST,
  ADMIN_VERIFY_OTP_SUCCESS,
} from "../action/admin";

const initialState = {
  admin: JSON.parse(localStorage.getItem("admin")),
  isLoading: false,
  success: "",
  error: "",
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_SIGNIN_REQUEST:
    case ADMIN_VERIFY_OTP_REQUEST:
    case ADMIN_LOGIN_REQUEST:
    case ADMIN_LOGOUT_REQUEST:
      // case ADMIN_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    // case ADMIN_DATA_SUCCESS:
    //   return {
    //     ...state,isloading:false,
    //     success:action.payload.message
    //   }
    case ADMIN_SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        admin: action.payload.admindata,
        isLoading: false,
        success: action.payload.message,
      };
    case ADMIN_VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        error: null,
      };
    case ADMIN_LOGOUT_SUCCESS:
      return {
        ...state,
        admin: null,
        success: action.payload.message,
        isLoading: false,
        error: null,
      };
    case ADMIN_SIGNIN_FAILURE:
    case ADMIN_VERIFY_OTP_FAILURE:
    case ADMIN_LOGIN_FAILURE:
    case ADMIN_LOGOUT_FAILURE:
      // case ADMIN_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialadminState = {
  admin: [],
  isLoading: false,
  success: "",
  error: "",
};
export const admindataReducer = (state = initialadminState, action) => {
  switch (action.type) {
    case ADMIN_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADMIN_DATA_SUCCESS:
      return {
        ...state,
        isloading: false,
        success: action.payload.message,
      };

    case ADMIN_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default adminReducer;
