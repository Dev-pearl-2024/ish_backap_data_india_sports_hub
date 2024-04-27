import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import userSaga from './userSaga';
import sportSaga from "./sportSaga"

function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    sportSaga()
  ]);
}

export default rootSaga;