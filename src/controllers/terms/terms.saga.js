import { all, takeLatest, put } from 'redux-saga/effects';
import { symbols, actions } from '../../models/terms/terms.actions';
import fetchCourses from './terms.fetch';

function* getTerms(action) {
  const response = yield fetchCourses.getTerms();
  const json = yield response.json();
  yield put(actions.receivedTerms(json));
}

function* getCoursesForTerm(action) {
  const response = yield fetchCourses.getCoursesForTerm(action.termId);
  const json = yield response.json();
  yield put(actions.receivedCoursesForTerm(json, action.termId));
}

export default function* mainSaga() {
  yield all([
    takeLatest(symbols.GET_TERMS, getTerms),
    takeLatest(symbols.GET_COURSES_FOR_TERM, getCoursesForTerm)
  ]);
}

