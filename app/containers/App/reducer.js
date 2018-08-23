/* eslint-disable no-unused-vars */
/*
 * AppReducer
 */

import { fromJS } from 'immutable';

// The initial state of the App
export const initialState = fromJS({});

function appReducer(state = initialState, action) {
  return state;
}

export default appReducer;
