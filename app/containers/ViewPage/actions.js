/*
 * ViewPage Actions
 */

import {
  GET_SESSION,
  GET_SESSION_SUCCESS,
  GET_SESSION_ERROR,
} from './constants';

/**
 * Get session by id, this action starts the request saga
 *
 * @param  {number} sessionID The current vote
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
