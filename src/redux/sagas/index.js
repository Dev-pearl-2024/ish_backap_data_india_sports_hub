import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import userSaga from './userSaga';
import sportSaga from "./sportSaga"
import favoriteSaga from './favoriteSaga';
import atheleteSaga from "./atheleteSaga"
import eventSaga from "./eventSaga";
import scoreSaga from './scoreSaga';

function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    sportSaga(),
    favoriteSaga(),
    atheleteSaga(),
    eventSaga(),
    scoreSaga()
  ]);
}

export default rootSaga;