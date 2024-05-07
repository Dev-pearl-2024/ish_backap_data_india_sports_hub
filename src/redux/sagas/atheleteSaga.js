import {call, put, takeLatest} from 'redux-saga/effects';
import {
    getAllAtheleteByID
} from '../api/atheleteApi';
import {
    FETH_ATHELETE_DATA_REQUEST,
    getAtheleteDataSuccess,
    getAtheleteDataFailure
} from '../actions/atheleteActions';

function* getAtheleteDataByID(action) {
  try {
    const data = yield call(getAllAtheleteByID, action.params);
    console.log(data,"-------athelete-data-by-id-------");
    yield put(getAtheleteDataSuccess(data));
  } catch (error) {
    yield put(getAtheleteDataFailure(error.response?.data?.errorMessage));
  }
}

function* atheleteSaga() {
  yield takeLatest(FETH_ATHELETE_DATA_REQUEST, getAtheleteDataByID);

}

export default atheleteSaga;
