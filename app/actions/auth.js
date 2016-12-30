
import Actions from '../constants/actions';
import cookie from '../utils/cookie';
import redirectBackAfter from '../utils/redirectBackAfter';
import axios from 'axios';
import getHeaders from '../utils/getHeaders.js';

const {
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
} = Actions;

const baseUrl = 'http://localhost:1337';

function saveAuthToken(token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookie.set({
    name: 'token',
    value: token,
    expires
  });
}

export function signup(email, password, router) {
  return async (dispatch) => {
    try {
      const { data: { token, user } } = await axios.post(`${baseUrl}/signup`, {
        email,
        password
      });

      saveAuthToken(token);

      dispatch({ type: LOGIN_SUCCESS, token });
      dispatch({ type: FETCH_PROFILE_SUCCESS, user });
      dispatch({ type: SIGNUP_SUCCESS });
      // TODO: don't do it here.
      router.transitionTo('/profile');
    } catch (error) {
      dispatch({
        type: SIGNUP_FAILURE,
        error: (error.status === 409)
          ? Error('User with such an email already exists')
          : Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  };
}

export function login(email, password, router) {
  return async (dispatch) => {
    try {
      const { data: { token, user } } = await axios.post(`${baseUrl}/login`, {
        email,
        password
      });

      saveAuthToken(token);

      dispatch({ type: LOGIN_SUCCESS, token });
      dispatch({ type: FETCH_PROFILE_SUCCESS, user });

      const { query } = router.state.location;
      const redirectTo = (query && query.redirectTo) ? query.redirectTo : '/';
      // TODO: don't do it here.
      router.transitionTo(redirectTo);
    } catch (err) {
      let error = (err.status === 401)
        ? Error('Incorrect email or password')
        : Error('Unknown error occured :-(. Please, try again later.');

      dispatch({ type: LOGIN_FAILURE, error });
    }
  };
}

export function logout(router) {
  return dispatch => {
    cookie.unset('token');

    dispatch({ type: LOGOUT });

    router.transitionTo(...redirectBackAfter('/login', router.location));
  };
}

export function fetchProfile() {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      const headers = getHeaders(token);
      const user = (await axios.get(`${baseUrl}/profile`, { headers })).data;
      dispatch({ type: FETCH_PROFILE_SUCCESS, user });
    } catch (error) {
      dispatch({ type: FETCH_PROFILE_FAILURE, error });
    }
  };
}

export function saveProfile(user) {
  return async (dispatch, getState) => {
    const { auth: { token } } = getState();

    dispatch({ type: SAVE_PROFILE, user });

    try {
      const headers = getHeaders(token);

      user = (await axios.put(
        `${baseUrl}/profile`,
         user,
        { headers })
      ).data;

      dispatch({ type: SAVE_PROFILE_SUCCESS, user });
    } catch (error) {
      dispatch({
        type: SAVE_PROFILE_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  };
}
