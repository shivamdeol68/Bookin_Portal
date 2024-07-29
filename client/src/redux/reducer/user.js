import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
} from "../action/user";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  isLoading: false,
  success:null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
    case VERIFY_OTP_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SIGNIN_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        success:true,
        isLoading: false,
        error: null,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
      };
    case SIGNIN_FAILURE:
    case VERIFY_OTP_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
