import {call, put, takeLatest} from 'redux-saga/effects';
import {getAllSports} from '../api/sportsApi';
import {
    GET_SPORTS_DATA_REQUEST,
  getSportsDataSuccess,
  getSportsDataFailure,
} from '../actions/sportsActions';

function* getSportsData() {
  try {
    const data = yield call(getAllSports);
    console.log(data, '-----dataresponse:');
    yield put(getSportsDataSuccess(data));
  } catch (error) {
    yield put(getSportsDataFailure(error.response?.data?.errorMessage));
  }
}

function* sportSaga() {
  yield takeLatest(GET_SPORTS_DATA_REQUEST, getSportsData);
}

export default sportSaga;
