//send Otp action type and creator
export const SEND_OTP_REQUEST = 'SEND_OTP_REQUEST';
export const SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS';
export const SEND_OTP_FAILURE = 'SEND_OTP_FAILURE';
export const SEND_OTP_LOADING = 'SEND_OTP_LOADING';

export const sendOtpRequest = (phoneNumber) => ({
  type: SEND_OTP_REQUEST,
  payload: phoneNumber,
});

export const sendOtpSuccess = () => ({
  type: SEND_OTP_SUCCESS,
});

export const sendOtpFailure = (error) => ({
  type: SEND_OTP_FAILURE,
  payload: error,
});

export const sendOtpLoading = () => ({
  type: SEND_OTP_LOADING,
});

//verify Otp action type and creator
export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';


export const verifyOtpSuccess = response => ({
  type: VERIFY_OTP_SUCCESS,
  response,
});


export const verifyOtpFailure = errorMessage => ({
  type: VERIFY_OTP_FAILURE,
  payload: { errorMessage },
});

export const verifyOtpRequest = payload => ({
  type: VERIFY_OTP_REQUEST,
  payload,
});

//create user action types and creators
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const userCreationRequest = userData => ({
  type: CREATE_USER_REQUEST,
  payload: userData
});

export const createUserSuccess = successMessage => ({
  type: CREATE_USER_SUCCESS,
  payload: { successMessage },
});

export const createUserFailure = errorMessage => ({
  type: CREATE_USER_FAILURE,
  payload: { errorMessage },
});

