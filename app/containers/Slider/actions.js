/*
 * Slider Actions
 */

import { CHANGE_VALUE } from './constants';

/**
 * Dispatched when slider value changes
 *
 * @param  {number} value The current value
 *
 * @return {object} An action object with a type of CHANGE_VALUE passing value
 */
export function changeValue(value) {
  return {
    type: CHANGE_VALUE,
    value,
  };
}
