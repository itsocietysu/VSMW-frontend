/**
 * HomePage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSession = state => state.get('getSession', initialState);

const makeSelectLoading = () =>
  createSelector(selectSession, sessionState => sessionState.get('loading'));

const makeSelectError = () =>
  createSelector(selectSession, sessionState => sessionState.get('error'));

const makeSelectSession = () =>
  createSelector(selectSession, sessionState => sessionState.get('session'));

export { selectSession, makeSelectLoading, makeSelectError, makeSelectSession };
