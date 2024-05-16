import {call, put, takeLatest} from 'redux-saga/effects';
import {createUserApi, getUsernameApi} from '../api/userApi';
import {
  CREATE_USER_REQUEST,
  FETCH_USER_NAME_REQUEST,
  createUserSuccess,
  createUserFailure,
  userNameSuccess,
  userNameFailure,
} from '../actions/userActions';

function* getUsername(action) {
  try {
    const response = yield call(getUsernameApi, action.payload);
    console.log(response, 'username---saga----');
    yield put(userNameSuccess(response));
  } catch (error) {
    yield put(userNameFailure(error.response?.data?.errorMessage));
  }
}

function* createUser(action) {
  try {
    const response = yield call(createUserApi, action.payload);
    console.log(response,"rspnse---by---saga")
    yield put(createUserSuccess(response.data.message));
  } catch (error) {
    yield put(createUserFailure(error.response?.data?.errorMessage));
  }
}

function* userSaga() {
  yield takeLatest(CREATE_USER_REQUEST, createUser);
  yield takeLatest(FETCH_USER_NAME_REQUEST, getUsername);
}

export default userSaga;
