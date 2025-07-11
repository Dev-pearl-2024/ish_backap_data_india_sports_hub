//send Otp action type and creator
export const SEND_OTP_REQUEST = 'SEND_OTP_REQUEST';
export const SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS';
export const SEND_OTP_FAILURE = 'SEND_OTP_FAILURE';
export const SEND_OTP_LOADING = 'SEND_OTP_LOADING';
export const SEND_OTP_ON_EMAIL = 'SEND_OTP_ON_EMAIL';

export const sendOtpRequest = (phoneNumber, countryCode) => ({
  type: SEND_OTP_REQUEST,
  payload: { phoneNumber, countryCode },
});

export const sendOtpOnEmailRequest = (email, type) => ({
  type: SEND_OTP_ON_EMAIL,
  payload: { email, type },
});

export const sendOtpSuccess = (message) => ({
  type: SEND_OTP_SUCCESS,
  payload: message,
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
export const SET_USER_ID = 'SET_USER_ID';
export const VERIFY_OTP_BY_EMAIL = 'VERIFY_OTP_BY_EMAIL';


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

export const verifyOtpByEmailRequest = payload => ({
  type: VERIFY_OTP_BY_EMAIL,
  payload,
});


export const setUserId = (userId) => ({
  type: SET_USER_ID,
  payload: userId
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


//purchase 
export const PURCHASE_FAIL = 'PURCHASE_FAILUFRE';
export const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';

export const purchaseRequestSuccess = payment => ({
  type: PURCHASE_SUCCESS,
  payload: payment
});

export const purchaseRequestFail = payment => ({
  type: PURCHASE_FAIL,
  payload: null
});
