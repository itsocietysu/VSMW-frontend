import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_VOTE, SEND_UNIQ_ID } from './constants';
import {
  voteGot,
  voteGettingError,
  uniqIdSent,
  uniqIdSendingError,
} from './actions';

import request from '../../utils/request';
import { getUniqID } from '../../cookieManager';

/**
 * Unique id create handler
 */
export function* createUniqID() {
  const uniqID = getUniqID();
  const requestURL = `http://each.itsociety.su:4201/vsmw/user/${uniqID}`; // TODO: change requestURL
  const options = {
    method: 'POST',
  };
  try {
    yield call(request, requestURL, options);
    console.log(uniqID);
    yield put(uniqIdSent(uniqID));
  } catch (err) {
    yield put(uniqIdSendingError(err));
  }
}

/**
 * Vote get handler
 */
export function* getVote() {
  const requestURL = `http://each.itsociety.su:4201/each/feed/all`; // TODO: change requestURL
  try {
    const session = yield call(request, requestURL);
    yield put(voteGot(session));
  } catch (err) {
    yield put(voteGettingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* processVoteData() {
  yield takeLatest(SEND_UNIQ_ID, createUniqID);
  yield takeLatest(GET_VOTE, getVote);
}
