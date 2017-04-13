/* eslint-env browser, node */

import axios from 'axios';
import { addNotif } from 'actions';
import cookie from 'utils/cookie';

const { API_URL } = process.env;

import constants from 'utils/constants';
const {
  LOGOUT,
  EMAIL_LOGIN,
  EMAIL_SIGNUP
} = constants;

function saveAuthToken(token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookie.set({
    name: 'token',
    value: token,
    expires
  });
}

export function emailLogin(email, password) {
  return async (dispatch) => {
    try {
      const { data: { token } } = await axios.post(
        `${API_URL}/auth/get_token`, {
          login: email,
          password
        });

      saveAuthToken(token);

      dispatch({ type: EMAIL_LOGIN, payload: token });
      window.location = '/';
    } catch (err) {
      dispatch({ type: EMAIL_LOGIN, error: err });

      dispatch(addNotif({
        color: 'red',
        message: err.status === 401
          ? 'Incorrect email or password'
          : 'Unknown error occured :-(. Please, try again later.'
      }));
    }
  };
}

export function logout() {
  return dispatch => {
    try {
      localStorage.setItem('editorToken', '');
      dispatch({ type: LOGOUT });
      window.location = '/login';
    } catch (err) {
      dispatch({ type: LOGOUT, error: err });

      // dispatch(addNotif({
      //   color: 'red',
      //   message: 'Unknown error occured :-(. Please, try again later.'
      // }));
    }
  };
}

export function emailSignup(email, password, invite) {
  const { code } = invite;
  return async dispatch => {
    try {
      const {
        data: { token }
      } = await axios.post(`${API_URL}/auth/invite`, {
        code,
        email, // email already in db. added when create invite token
        password
      });

      saveAuthToken(token);

      dispatch({ type: EMAIL_SIGNUP, token });

      window.location = '/';
    } catch (err) {
      console.log(err);

      // TODO add notifs to basic layout??
      // dispatch(addNotif({
      //   color: 'red',
      //   message: (err.status === 409)
      //     ? 'User with such an email already exists'
      //     : 'Unknown error occured :-(. Please, try again later.'
      // }));
    }
  };
}
