import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_SESSION } from './constants';
import { sessionGot, sessionGettingError } from './actions';

import request from '../../utils/request';
import { apiUri } from '../../utils/constants';

/**
 * Current session get handler
 */
export function* getSession() {
  const requestURL = apiUri.current_object;
  try {
    const session = (yield call(request, requestURL))[0];
    session.vid = Number(session.vid);
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
