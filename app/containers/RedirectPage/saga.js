import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_SESSION } from './constants';
import { sessionGot, sessionGettingError } from './actions';

import request from '../../utils/request';

/**
 * Current session get handler
 */
export function* getSession() {
  const requestURL = `http://each.itsociety.su:4201/each/feed/all`;
  try {
    const session = yield call(request, requestURL);
    yield put(sessionGot(session));
  } catch (err) {
    yield put(sessionGettingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getSessionData() {
  yield takeLatest(GET_SESSION, getSession);
}
