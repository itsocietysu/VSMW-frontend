/**
 * ViewPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectStats = state => state.get('stats', initialState);

const makeSelectLoading = () =>
  createSelector(selectStats, statsState => statsState.get('loading'));

const makeSelectSessionID = () =>
  createSelector(selectStats, statsState => statsState.get('sessionID'));

const makeSelectSession = () =>
  createSelector(selectStats, statsState => statsState.get('session'));

export {
  selectStats,
  makeSelectLoading,
  makeSelectSessionID,
  makeSelectSession,
};
