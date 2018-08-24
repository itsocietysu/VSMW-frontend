/**
 * SliderPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSlider = state => state.get('slider', initialState);

const makeSelectValue = () =>
  createSelector(selectSlider, sliderState => sliderState.get('value'));

export { selectSlider, makeSelectValue };
