import { put, take, fork, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import scheduleData from '../../config/scheduleData.json';

function* loadSchedule() {
 try {
   yield call(delay, parseInt(Math.random() * 1500, 10));
   yield put({type: 'LOAD_SCHEDULE_SUCCESS', schedule: scheduleData});
 } catch (error) {
   yield put({type: 'LOAD_SCHEDULE_ERROR', error});
 }
}

function* watchLoadSchedule() {
  while (true) {
    yield take('LOAD_SCHEDULE');
    yield fork(loadSchedule);
  }
}

export default function* () {
  yield [watchLoadSchedule()];
}
