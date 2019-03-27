import { all, takeLatest, call } from 'redux-saga/effects';
import { symbols } from "../models/courses/courses.actions";


function* lookupCourse(action) {
  console.log(action);
  try {
    const url = 'https://cors-anywhere.herokuapp.com/http://www.adm.uwaterloo.ca/cgi-bin/cgiwrap/infocour/salook.pl?level=under&sess=1191&subject=CS&cournum=245';
    const headers = new Headers();
    headers.append('Origin', 'null');
    const response = yield call(fetch, url, {
      headers: headers
    });
    
    const tableStart = '<TABLE>';
    const tableEnd = '</TABLE>';
    let raw = yield response.text();
    let arr = [];
    let ctr = 0;
    while (raw.indexOf(tableStart) !== -1 && ctr < 300) {
      let start = raw.indexOf(tableStart);
      let end = raw.indexOf(tableEnd) + tableEnd.length;
      console.log(start, end);
      if (end == 0) {
        console.log(raw);
      }
      const str = raw.slice(start, end);
      raw = raw.slice(end);
      arr.push(str);
      ctr++;
    }
    
    console.log(ctr);
    console.log(arr);
    
  } catch (e) {
    console.log(e);
  }
  yield;
}

export default function* mainSaga() {
  yield all([
    takeLatest(symbols.LOOKUP_COURSE, lookupCourse),
  ]);
}
