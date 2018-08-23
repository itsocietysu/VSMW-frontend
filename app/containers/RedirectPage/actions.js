/*
 * RedirectPage Actions
 */

import {
  GET_SESSION,
  GET_SESSION_SUCCESS,
  GET_SESSION_ERROR,
} from './constants';

/**
 * Get current session, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_SESSION
 */
export function getSession() {
  return {
    type: GET_SESSION,
  };
}

/**
 * Dispatched when current session is got by the request saga
 *
 * @param  {string} session The current session
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
