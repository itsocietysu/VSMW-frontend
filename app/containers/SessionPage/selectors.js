/**
 * VotePage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectVote = state => state.get('vote', initialState);

const makeSelectLoading = () =>
  createSelector(selectVote, voteState => voteState.get('loading'));

const makeSelectError = () =>
  createSelector(selectVote, voteState => voteState.get('error'));

const makeSelectSessionID = () =>
  createSelector(selectVote, voteState => voteState.get('sessionID'));

const makeSelectSession = () =>
  createSelector(selectVote, voteState => voteState.get('session'));

const makeSelectVote = () =>
  createSelector(selectVote, voteState => voteState.get('vote').toJS());

export {
  selectVote,
  makeSelectLoading,
  makeSelectError,
  makeSelectSessionID,
  makeSelectSession,
  makeSelectVote,
};
