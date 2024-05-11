import {call, put, takeLatest} from 'redux-saga/effects';
import {getScoreFormatApi} from '../api/scoreApi';
import {
  GET_SCORE_FORMAT,
  getScoreFormatSuccess,
  getScoreFormatFailure,
} from '../actions/scoreAction';

function* postScoreData(action) {
  try {
    const data = yield call(getScoreFormatApi, action.payload); 
    yield put(getScoreFormatSuccess(data));
  } catch (error) {
    yield put(getScoreFormatFailure(error.response?.data?.errorMessage));
  }
}

function* scoreSaga() {
  yield takeLatest(GET_SCORE_FORMAT, postScoreData);
}

export default scoreSaga;
