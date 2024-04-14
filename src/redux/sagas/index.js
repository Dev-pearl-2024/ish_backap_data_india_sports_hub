import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import userSaga from './userSaga';

function* rootSaga() {
  yield all([
    authSaga(),
    userSaga()
  ]);
}

export default rootSaga;