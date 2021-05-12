import { all, fork, spawn } from 'redux-saga/effects';
import { saga as weather } from './weather';
export default function* () {
  yield fork(boostrap);
}
function* boostrap() {
  try {
    yield all([spawn(weather)]);
  } catch (e) {
    // Error handling
  }
}
