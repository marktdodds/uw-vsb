import { all, takeLatest, put } from 'redux-saga/effects';
import { symbols, actions } from '../../models/courses/courses.actions';
import fetchCourses from './courses.fetch';

function* getCourseInformation(action) {
  const response = yield fetchCourses.getCourseInformation(action.subject, action.catalog_number);
  const json = yield response.json();
  yield put(actions.receivedCourseInformation(json));
}

export default function* mainSaga() {
  yield all([
    takeLatest(symbols.GET_COURSE_INFORMATION, getCourseInformation)
  ]);
}

