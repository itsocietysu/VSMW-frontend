/*
 * SessionPage Actions
 */

import {
  GET_VOTE,
  GET_VOTE_SUCCESS,
  GET_VOTE_ERROR,
  SEND_UNIQ_ID,
  SEND_UNIQ_ID_SUCCESS,
  SEND_UNIQ_ID_ERROR,
} from './constants';

/**
 * Get vote, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_VOTE
 */
export function getVote() {
  return {
    type: GET_VOTE,
  };
}

/**
 * Dispatched when vote is got by the request saga
 *
 * @param  {number} vote The current vote
 *
 * @return {object} An action object with a type of GET_VOTE_SUCCESS passing vote
 */
export function voteGot(vote) {
  return {
    type: GET_VOTE_SUCCESS,
    vote,
  };
}

/**
 * Dispatched when getting vote fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_VOTE_ERROR passing the error
 */
export function voteGettingError(error) {
  return {
    type: GET_VOTE_ERROR,
    error,
  };
}

/**
 * Send unique id, this action starts the request saga
 *
 * @return {object} An action object with a type of SEND_UNIQ_ID
 */
export function sendUniqID() {
  return {
    type: SEND_UNIQ_ID,
  };
}

/**
 * Dispatched when unique id is sent and sent by the request saga
 *
 * @param  {string} uniqID The current unique id
 *
 * @return {object} An action object with a type of SEND_UNIQ_ID_SUCCESS  passing uniqID
 */
export function uniqIdSent(uniqID) {
  return {
    type: SEND_UNIQ_ID_SUCCESS,
    uniqID,
  };
}

/**
 * Dispatched when sending unique id fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of SEND_UNIQ_ID_ERROR passing the error
 */
export function uniqIdSendingError(error) {
  return {
    type: SEND_UNIQ_ID_ERROR,
    error,
  };
}
