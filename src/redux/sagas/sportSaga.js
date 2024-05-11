import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getAllSports,
  addFavouritesApi,
  getAllIndianAtheleteApi,
  getAllRecordsBySportsNameApi
} from '../api/sportsApi';
import {
  GET_SPORTS_DATA_REQUEST,
  getSportsDataSuccess,
  getSportsDataFailure,
  ADD_FAVOURITES_REQUEST,
  addFavoutiteSuccess,
  addFavoutiteFailure,
  FETCH_INDIAN_ATHL_REQUEST,
  fetchIndianAtheletSuccess,
  fetchIndianAtheletFailure,
  FETH_ALL_RECORD_REQUEST,
  fetchAllRecordSuccess,
  fetchAllRecordFailure
} from '../actions/sportsActions';

function* getSportsData() {
  try {
    const data = yield call(getAllSports);
    yield put(getSportsDataSuccess(data));
  } catch (error) {
    yield put(getSportsDataFailure(error.response?.data?.errorMessage));
  }
}

function* addfavourites(action) {
  try {
    const data = yield call(addFavouritesApi, action.payload);
    yield put(addFavoutiteSuccess(data));
  } catch (error) {
    yield put(addFavoutiteFailure(error.message));
  }
}

function* fetchIndianAtheleteData() {
  try {
    const response = yield call(getAllIndianAtheleteApi);
    yield put(fetchIndianAtheletSuccess(response));
  } catch (error) {
    yield put(fetchIndianAtheletFailure(error.message));
  }
}

function* fetchAllRecordsData() {
  try {
    const response = yield call(getAllRecordsBySportsNameApi); 
    yield put(fetchAllRecordSuccess(response));
  } catch (error) {
    yield put(fetchAllRecordFailure(error.message));
  }
}

function* sportSaga() {
  yield takeLatest(GET_SPORTS_DATA_REQUEST, getSportsData);
  yield takeLatest(ADD_FAVOURITES_REQUEST, addfavourites);
  yield takeLatest(FETCH_INDIAN_ATHL_REQUEST, fetchIndianAtheleteData);
  yield takeLatest(FETH_ALL_RECORD_REQUEST, fetchAllRecordsData);

}

export default sportSaga;
