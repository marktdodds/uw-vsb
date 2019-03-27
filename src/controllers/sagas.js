import { all } from 'redux-saga/effects';
import { mainSaga } from './main.saga';
import coursesSaga from './courses/courses.saga'

export default function* rootSaga() {
  yield all([
    mainSaga(),
    coursesSaga()
  ]);
}
