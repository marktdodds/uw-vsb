import { all, takeLatest, put } from 'redux-saga/effects';
import { symbols as coursesSymbols, actions as coursesActions } from '../../models/courses/courses.actions';
import fetchCourses from './courses.fetch';

function* loadCourseSchedule(action) {
  const response = yield fetchCourses.getCourseSchedule(action.classNumber);
  const json = yield response.json();
  yield put(coursesActions.receivedCourseSchedule(json));
}

export default function* mainSaga() {
  yield all([
    takeLatest(coursesSymbols.GET_COURSE_SCHEDULE, loadCourseSchedule)
  ]);
}

