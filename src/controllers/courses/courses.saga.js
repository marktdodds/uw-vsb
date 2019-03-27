import { all, takeLatest, call } from 'redux-saga/effects';
import { symbols } from "../../models/courses/courses.actions";

function* lookupCourse(action) {
  console.log(action);
  try {
    const url = 'https://api.uwaterloo.ca/v2/courses';
    const headers = new Headers();
    const response = yield call(fetch, url);
    
    console.log(response.json);
    
  } catch (e) {
    console.log(e);
  }
  yield;
}

export default function* mainSaga() {
  yield all([
  ]);
}

