import { all } from 'redux-saga/effects';
import { mainSaga } from './main.saga';

export default function* rootSaga() {
  yield all([
    mainSaga()
  ]);
}
