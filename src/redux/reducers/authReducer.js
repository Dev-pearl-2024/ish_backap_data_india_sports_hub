import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  SEND_OTP_LOADING,
} from '../actions/authActions';

const initialState = {
  successMessage: null,
  errorMessage: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload.successMessage,
        errorMessage: null,
      };
    case SEND_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        successMessage: null,
        errorMessage: action.payload.errorMessage,
      };
    case SEND_OTP_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.response,
        errorMessage: null,
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        successMessage: null, 
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default authReducer;
