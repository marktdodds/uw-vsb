import { all, takeLatest, put } from 'redux-saga/effects';
import { symbols as navSymbols } from '../models/navigation/navigation.actions';

function* dummyReq(action) {
  console.log('Got dummy req');
  console.log(action);
  yield;
}

export function* mainSaga() {
  yield all([
    takeLatest(navSymbols.DUMMY_REQ, dummyReq)
  ]);
}
