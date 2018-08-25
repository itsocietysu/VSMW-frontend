/*
 * SessionPage Actions
 */

import {
  GET_SESSION,
  GET_SESSION_SUCCESS,
  GET_SESSION_ERROR,
  GET_VOTE,
  GET_VOTE_SUCCESS,
  GET_VOTE_ERROR,
  SEND_VOTE,
  SEND_VOTE_SUCCESS,
  SEND_VOTE_ERROR,
} from './constants';

/**
 * Get session by id, this action starts the request saga
 *
 * @param  {number} sessionID The current session id
 *
 * @return {object} An action object with a type of GET_SESSION passing sessionID
 */
export function getSession(sessionID) {
  return {
    type: GET_SESSION,
    sessionID,
  };
}

/**
 * Dispatched when session is got by the request saga
 *
 * @param  {object} session The current session
 *
 * @return {object} An action object with a type of GET_SESSION_SUCCESS passing session
 */
export function sessionGot(session) {
  return {
    type: GET_SESSION_SUCCESS,
    session,
  };
}

/**
 * Dispatched when getting session fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_SESSION_ERROR passing the error
 */
export function sessionGettingError(error) {
  return {
    type: GET_SESSION_ERROR,
    error,
  };
}

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
 * Send vote, this action starts the request saga
 *
 * @param  {number} vote The current vote
 *
 * @return {object} An action object with a type of SEND_VOTE passing vote
 */
export function sendVote(vote) {
  return {
    type: SEND_VOTE,
    vote,
  };
}

/**
 * Dispatched when vote is sent by the request saga
 *
 * @return {object} An action object with a type of SEND_VOTE_SUCCESS
 */
export function voteSent() {
  return {
    type: SEND_VOTE_SUCCESS,
  };
}

/**
 * Dispatched when sending vote fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of SEND_VOTE_ERROR passing the error
 */
export function voteSendingError(error) {
  return {
    type: SEND_VOTE_ERROR,
    error,
  };
}
