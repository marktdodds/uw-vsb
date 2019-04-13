import { all, takeLatest, put } from 'redux-saga/effects';
import { symbols, actions } from '../../models/terms/terms.actions';
import fetchCourses from './terms.fetch';

function* getTerms() {
  const response = yield fetchCourses.getTerms();
  const json = yield response.json();
  yield put(actions.receivedTerms(json));
}

function* getCoursesForTerm(action) {
  const response = yield fetchCourses.getCoursesForTerm(action.selectedTerm);
  const json = yield response.json();
  yield put(actions.receivedCoursesForTerm(json, action.selectedTerm));
}

function* getCourseScheduleForTerm(action) {
  const response = yield fetchCourses.getCourseScheduleForTerm(action.selectedTerm, action.subject, action.catalogNumber);
  const json = yield response.json();
  yield put(actions.receivedCourseScheduleForTerm(json, action.selectedTerm, action.subject, action.catalogNumber));
}

export default function* mainSaga() {
  yield all([
    takeLatest(symbols.GET_TERMS, getTerms),
    takeLatest(symbols.GET_COURSES_FOR_TERM, getCoursesForTerm),
    takeLatest(symbols.GET_COURSE_SCHEDULE_FOR_TERM, getCourseScheduleForTerm),
  ]);
}

