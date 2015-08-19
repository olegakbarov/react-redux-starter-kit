import {
  FETCH_SINGLE_USER_SUCCESS,
  FETCH_SINGLE_USER_FAILURE
} from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders.js';

const baseUrl = 'http://localhost:1337';

export function fetchSingleUser(username) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token, id }, users } = getState(); //eslint-disable-line
      const headers = getHeaders(token);
      const user = (await axios.get(
        `${baseUrl}/users/${username}`,
        { headers })).data;

      dispatch({ type: FETCH_SINGLE_USER_SUCCESS, user });
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_USER_FAILURE, error });
    }
  };
}
