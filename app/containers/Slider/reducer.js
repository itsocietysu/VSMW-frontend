/*
 * SliderReducer
 */

import { fromJS } from 'immutable';

import { CHANGE_VALUE } from './constants';

export const initialState = fromJS({
  value: 0,
});

function sliderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VALUE:
      return state.set('value', action.value);
    default:
      return state;
  }
}

export default sliderReducer;
