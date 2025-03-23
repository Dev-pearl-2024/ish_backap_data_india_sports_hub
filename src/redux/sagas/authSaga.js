import { call, put, takeLatest } from 'redux-saga/effects';
import { sendOtpApi, sendOtpOnEmailApi, verifyOtpApi, verifyOtpByEmailApi } from '../api/authApi';
import {
  SEND_OTP_REQUEST,
  sendOtpSuccess,
  sendOtpFailure,
  VERIFY_OTP_REQUEST,
  verifyOtpSuccess,
  verifyOtpFailure,
  setUserId,
  VERIFY_OTP_BY_EMAIL,
  SEND_OTP_ON_EMAIL
} from '../actions/authActions';

function* sendOtp(action) {
  try {
    const response = yield call(sendOtpApi, action.payload);
    yield put(sendOtpSuccess(response));
  } catch (error) {
    yield put(sendOtpFailure(error.message));
  }
}

function* verifyOtp(action) {
  try {
    const response = yield call(verifyOtpApi, action.payload);
    const userId = response?.data?._id;
    yield put(setUserId(userId));
    yield put(verifyOtpSuccess(response));
  } catch (error) {
    console.error('Error:', error);
    yield put(verifyOtpFailure(error.response?.data?.errorMessage));
  }
}

function* sendOtpOnEmail(action) {
  try {
    const response = yield call(sendOtpOnEmailApi, action.payload);
    yield put(sendOtpSuccess(response));
  } catch (error) {
    yield put(sendOtpFailure(error.message));
  }
}

function* verifyOtpByEmail(action) {
  try {
    const response = yield call(verifyOtpByEmailApi, action.payload);
    const userId = response?.data?._id;
    yield put(setUserId(userId));
    yield put(verifyOtpSuccess(response));
  } catch (error) {
    console.error('Error:', error);
    yield put(verifyOtpFailure(error.response?.data?.errorMessage));
  }
}

function* authSaga() {
  yield takeLatest(SEND_OTP_REQUEST, sendOtp);
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOtp);
  yield takeLatest(SEND_OTP_ON_EMAIL, sendOtpOnEmail);
  yield takeLatest(VERIFY_OTP_BY_EMAIL, verifyOtpByEmail);
}

export default authSaga;