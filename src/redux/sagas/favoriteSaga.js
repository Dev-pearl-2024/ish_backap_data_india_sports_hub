import {call, put, takeLatest} from 'redux-saga/effects';
import {getAllFavorite} from '../api/favoriteApi';
import {
  GET_FAVORITE_DATA_REQUEST,
  getFavoriteDataSuccess,
  getFavoriteDataFailure,
} from '../actions/favoriteAction';

function* getFavoriteData() {
  try {
    const data = yield call(getAllFavorite);

    yield put(getFavoriteDataSuccess(data));
  } catch (error) {
    yield put(getFavoriteDataFailure(error.response?.data?.errorMessage));
  }
}

function* favoriteSaga() {
  yield takeLatest(GET_FAVORITE_DATA_REQUEST, getFavoriteData);
}

export default favoriteSaga;
