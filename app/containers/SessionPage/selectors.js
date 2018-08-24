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

const makeSelectVote = () =>
  createSelector(selectVote, voteState => voteState.get('vote'));

export { selectVote, makeSelectLoading, makeSelectError, makeSelectVote };
