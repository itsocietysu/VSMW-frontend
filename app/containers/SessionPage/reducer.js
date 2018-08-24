/*
 * SessionPageReducer
 */

import { fromJS } from 'immutable';
import { getUniqID } from '../../cookieManager';

import {
  GET_VOTE,
  GET_VOTE_ERROR,
  GET_VOTE_SUCCESS,
  SEND_UNIQ_ID,
  SEND_UNIQ_ID_ERROR,
  SEND_UNIQ_ID_SUCCESS,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  vote: false,
  uniqID: getUniqID() || '',
});

function voteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VOTE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('vote', false);
    case GET_VOTE_SUCCESS:
      return state.set('loading', false).set('vote', action.vote);
    case GET_VOTE_ERROR:
      return state.set('error', action.error).set('loading', false);
    case SEND_UNIQ_ID:
      return state.set('loading', true).set('error', false);
    case SEND_UNIQ_ID_SUCCESS:
      return state.set('loading', false).set('uniqID', action.uniqID);
    case SEND_UNIQ_ID_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default voteReducer;
