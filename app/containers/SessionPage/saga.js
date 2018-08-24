import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_SESSION, GET_VOTE, SEND_VOTE } from './constants';
import {
  sessionGot,
  sessionGettingError,
  voteGot,
  voteGettingError,
  voteSent,
  voteSendingError,
} from './actions';

import { makeSelectSessionID, makeSelectVote } from './selectors';

import request from '../../utils/request';

import { getUniqID } from '../../cookieManager';

/**
 * Session get handler
 */
export function* getSession() {
  const sessionID = yield select(makeSelectSessionID());
  const requestURL = `http://89.108.103.193:4200/vsmw/session/${sessionID}`;
  try {
    const session = yield call(request, requestURL);
    yield put(sessionGot(session[0]));
  } catch (err) {
    yield put(sessionGettingError(err));
  }
}

/**
 * Vote get handler
 */
export function* getVote() {
  const uniqID = getUniqID();
  const sessionID = yield select(makeSelectSessionID());
  const requestURL = `http://89.108.103.193:4200/vsmw/vote/${sessionID}/${uniqID}`;
  try {
    const vote = yield call(request, requestURL);
    const newVote = {
      session: sessionID,
      fingerprint: uniqID,
      value: -1,
    };
    if (vote.length) newVote.value = Number(vote[0].value);
    yield put(voteGot(newVote));
  } catch (err) {
    yield put(voteGettingError(err));
  }
}

/**
 * Vote send handler
 */
export function* sendVote() {
  const voteData = yield select(makeSelectVote());
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(voteData),
  };
  const requestURL = `http://89.108.103.193:4200/vsmw/vote`;
  try {
    const vote = yield call(request, requestURL, options);
    yield put(voteSent());
    yield put(voteGot(vote[0]));
  } catch (err) {
    yield put(voteSendingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* processVoteData() {
  yield takeLatest(GET_SESSION, getSession);
  yield takeLatest(GET_VOTE, getVote);
  yield takeLatest(SEND_VOTE, sendVote);
}
