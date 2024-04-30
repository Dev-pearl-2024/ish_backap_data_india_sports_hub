import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import userSaga from './userSaga';
import sportSaga from "./sportSaga"
import favoriteSaga from './favoriteSaga';

function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    sportSaga(),
    favoriteSaga()
  ]);
}

export default rootSaga;