/*
 * SessionPageReducer
 */

import { fromJS } from 'immutable';
import { getUniqID } from '../../cookieManager';

import {
  GET_SESSION,
  GET_SESSION_ERROR,
  GET_SESSION_SUCCESS,
  GET_VOTE,
  GET_VOTE_ERROR,
  GET_VOTE_SUCCESS,
  SEND_VOTE,
  SEND_VOTE_ERROR,
  SEND_VOTE_SUCCESS,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  sessionID: 0,
  vote: {
    session: '',
    fingerprint: '',
    value: -1,
  },
});

function voteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SESSION:
      return state
        .set('loading', true)
        .set('error', false)
        .set('session', false)
        .set('sessionID', action.sessionID);
    case GET_SESSION_SUCCESS:
      return state.set('loading', false);
    case GET_SESSION_ERROR:
      return state.set('error', action.error).set('loading', false);
    case GET_VOTE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('sessionID', action.sessionID)
        .set(
          'vote',
          fromJS({
            session: action.sessionID,
            fingerprint: getUniqID(),
            value: -1,
          }),
        );
    case GET_VOTE_SUCCESS:
      return state.set('loading', false).set('vote', fromJS(action.vote));
    case GET_VOTE_ERROR:
      return state.set('error', action.error).set('loading', false);
    case SEND_VOTE:
      return state
        .setIn(['vote', 'value'], action.vote)
        .set('loading', true)
        .set('error', false);
    case SEND_VOTE_SUCCESS:
      return state.set('loading', false);
    case SEND_VOTE_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default voteReducer;
