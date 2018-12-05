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
import { sessionGot as HomeSessionGot } from '../HomePage/actions';

import { makeSelectSessionID, makeSelectVote } from './selectors';

import request from '../../utils/request';

import { getUniqID } from '../../cookieManager';
import { apiUri } from '../../utils/constants';

/**
 * Session get handler
 */
export function* getSession() {
  const sessionID = yield select(makeSelectSessionID());
  const requestURL = apiUri.get_session(sessionID);
  try {
    const session = (yield call(request, requestURL))[0];
    if (!session) throw new Error('No session');
    session.vid = Number(session.vid);
    yield put(HomeSessionGot(session));
    yield put(sessionGot());
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
  const requestURL = apiUri.get_vote(sessionID, uniqID);
  try {
    const vote = (yield call(request, requestURL))[0];
    const newVote = {
      session: sessionID,
      fingerprint: uniqID,
      value: -1,
    };
    if (vote) newVote.value = Number(vote.value);
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
  const requestURL = apiUri.send_vote;
  try {
    yield call(request, requestURL, options);
    yield put(voteSent());
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
