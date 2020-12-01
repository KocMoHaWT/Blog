import { all, fork } from 'redux-saga/effects';
import { authRootSaga } from "./modules/auth";

export default function* rootSaga() {
  yield all([fork(authRootSaga)]);
}
