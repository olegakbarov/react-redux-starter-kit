import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,

  FETCH_SINGLE_USER_SUCCESS,
  FETCH_SINGLE_USER_FAILURE
} from '../constants/actions';

import * as api from '../api/app';

export function fetchUsers() {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      const users = await api.fetchUsers(token);

      dispatch({ type: FETCH_USERS_SUCCESS, users });
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, error });
    }
  };
}

export function fetchSingleUser(username) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token, id }, users } = getState(); //eslint-disable-line
      const user = await api.fetchSingleUser(token, username);

      dispatch({ type: FETCH_SINGLE_USER_SUCCESS, user });
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_USER_FAILURE, error });
    }
  };
}
