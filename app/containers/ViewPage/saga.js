import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_SESSION } from './constants';
import { sessionGot, sessionGettingError } from './actions';

import { makeSelectSessionID } from './selectors';

import request from '../../utils/request';
import { apiUri } from '../../utils/constants';

/**
 * Session get handler
 */
export function* getSession() {
  const sessionID = yield select(makeSelectSessionID());
  const requestURL = apiUri.get_stats(sessionID);
  try {
    const session = yield call(request, requestURL);
    if (!session.length) throw new Error('No session');
    yield put(sessionGot(session[0]));
  } catch (err) {
    yield put(sessionGettingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getViewData() {
  yield takeLatest(GET_SESSION, getSession);
}
