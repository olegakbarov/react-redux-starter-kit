import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT,

  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,

  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_FAILURE
} from '../constants/actions';

import * as api from '../api/app';
import cookie from '../utils/cookie';
import redirectBackAfter from '../utils/redirectBackAfter';

function saveAuthToken(token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookie.set({
    name: 'token',
    value: token,
    expires
  });
}

export function signup(email, password, username, shortDescription, router) {
  return async (dispatch) => {
    try {
      const { token, user } = await api.signup(
        email,
        password,
        username,
        shortDescription
      );

      saveAuthToken(token);

      dispatch({ type: LOGIN_SUCCESS, token });
      dispatch({ type: FETCH_PROFILE_SUCCESS, user });
      dispatch({ type: SIGNUP_SUCCESS });
      router.transitionTo('/profile');
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, error });
    }
  };
}

export function login(email, password, router) {
  return async (dispatch) => {
    try {
      const { token, user } = await api.login(email, password);

      saveAuthToken(token);

      dispatch({ type: LOGIN_SUCCESS, token });
      dispatch({ type: FETCH_PROFILE_SUCCESS, user });

      const { query } = router.state.location;
      const redirectTo = (query && query.redirectTo) ? query.redirectTo : '/';

      router.transitionTo(redirectTo);
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, error });
    }
  };
}

export function logout(router) {
  return dispatch => {
    cookie.unset('token');

    dispatch({ type: LOGOUT });

    router.transitionTo(...redirectBackAfter('/login', router.state));
  };
}

export function fetchProfile() {
  return async (dispatch, getState) => {
    try {
      const { auth: { token, userId }, users } = getState();

      if (!token || users[userId]) { return; }

      const user = await api.fetchProfile(token);

      dispatch({ type: FETCH_PROFILE_SUCCESS, user });
    } catch (error) {
      dispatch({ type: FETCH_PROFILE_FAILURE, error });
    }
  };
}

export function saveProfile(user) {
  return async (dispatch, getState) => {
    const { auth: { token, userId } } = getState();

    dispatch({ type: SAVE_PROFILE, userId, user });

    try {
      user = await api.saveProfile(token, user);

      dispatch({ type: SAVE_PROFILE_SUCCESS, userId, user });
    } catch (error) {
      dispatch({ type: SAVE_PROFILE_FAILURE, error });
    }
  };
}
