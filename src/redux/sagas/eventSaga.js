import {call, put, takeLatest} from 'redux-saga/effects';
import {
    getHomePageEventsApi
} from '../api/atheleteApi';
import {
    FETH_HOME_PAGE_EVENT_REQUEST,
    fetchHomePageEventSuccess,
    fetchHomePageEventFailure
} from '../actions/eventActions';

function* getEventData() {
  try {
    const data = yield call(getHomePageEventsApi); 
    yield put(fetchHomePageEventSuccess(data));
  } catch (error) {
    yield put(fetchHomePageEventFailure(error.response?.data?.errorMessage));
  }
}

function* eventSaga() {
  yield takeLatest(FETH_HOME_PAGE_EVENT_REQUEST, getEventData);

}

export default eventSaga;
