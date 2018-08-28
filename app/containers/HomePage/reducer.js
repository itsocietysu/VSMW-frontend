/*
 * HomePageReducer
 */

import { fromJS } from 'immutable';

import {
  GET_SESSION,
  GET_SESSION_ERROR,
  GET_SESSION_SUCCESS,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  session: false,
});

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SESSION:
      return state.set('loading', true).set('error', false);
    case GET_SESSION_SUCCESS:
      return state.set('loading', false).set('session', action.session);
    case GET_SESSION_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default sessionReducer;
