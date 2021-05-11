import { all, fork } from 'redux-saga/effects';

export default function* () {
  yield fork(boostrap);
}
function* boostrap() {
  try {
    yield all([]);
  } catch (e) {
    // Error handling
  }
}
