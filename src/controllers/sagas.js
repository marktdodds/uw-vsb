import { all } from 'redux-saga/effects';
import coursesSaga from './courses/courses.saga'
import termsSaga from './terms/terms.saga'

export default function* rootSaga() {
  yield all([
    termsSaga(),
    coursesSaga()
  ]);
}
