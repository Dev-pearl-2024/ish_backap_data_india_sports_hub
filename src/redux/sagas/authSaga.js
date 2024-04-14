import { call, put, takeLatest } from 'redux-saga/effects';
import { sendOtpApi, verifyOtpApi } from '../api/authApi';
import { SEND_OTP_REQUEST,
   sendOtpSuccess,
    sendOtpFailure,
    VERIFY_OTP_REQUEST,
    verifyOtpSuccess,
    verifyOtpFailure,
  
   } from '../actions/authActions';

function* sendOtp(action) {
  try {
    yield call(sendOtpApi, action.payload);
    yield put(sendOtpSuccess());
  } catch (error) {
    yield put(sendOtpFailure(error.message));
  }
}

function* verifyOtp(action) {
  try {
    const response = yield call(verifyOtpApi, action.payload);
    yield put(verifyOtpSuccess(response));
  } catch (error) {
    console.error('Error:', error);
    yield put(verifyOtpFailure(error.response?.data?.errorMessage));
  }
}

function* authSaga() {
  yield takeLatest(SEND_OTP_REQUEST, sendOtp);
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOtp);
}

export default authSaga;