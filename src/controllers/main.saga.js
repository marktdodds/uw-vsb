import { all, takeLatest } from 'redux-saga/effects';
import { symbols as navSymbols } from '../models/navigation/navigation.actions';

function* dummyReq(action) {
  yield;
}

export function* mainSaga() {
  yield all([
    takeLatest(navSymbols.DUMMY_REQ, dummyReq)
  ]);
}
