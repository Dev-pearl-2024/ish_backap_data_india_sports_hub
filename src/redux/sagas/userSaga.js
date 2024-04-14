import {call, put, takeLatest} from 'redux-saga/effects';
import {createUserApi} from '../api/userApi';
import {
    CREATE_USER_REQUEST,
  createUserSuccess,
  createUserFailure,
} from '../actions/userActions';

function* createUser(action) {
  try {
    console.log("userSaga0",action)
    const response = yield call(createUserApi, action.payload);
    console.log(response,"response:")
    yield put(createUserSuccess(response.data.message));
  } catch (error) {
    yield put(createUserFailure(error.response?.data?.errorMessage));
  }
}

function* userSaga() {
  yield takeLatest(CREATE_USER_REQUEST, createUser);
}

export default userSaga;
