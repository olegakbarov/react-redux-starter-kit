import Actions from '../constants/actions';
import axios from 'axios';
import getHeaders from '../utils/getHeaders';

const {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,

  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,

  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE
} = Actions;

const baseUrl = 'http://localhost:1337';

export function fetchPosts() {
  return async (dispatch) => {
    try {
      const posts = (await axios.get(`${baseUrl}/posts`)).data;
      dispatch({ type: FETCH_POSTS_SUCCESS, posts });
    } catch (error) {
      dispatch({
        type: FETCH_POSTS_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  };
}

export function fetchPost(id) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      const headers = getHeaders(token);

      const post = (await axios.get(`${baseUrl}/posts/${id}`, {
        headers
      })).data;
      dispatch({ type: FETCH_POST_SUCCESS, post });
    } catch (error) {
      dispatch({
        type: FETCH_POST_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  };
}

export function savePost(post) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      let headers = getHeaders(token);

      if (post.id) {
        post = (await axios.put(`${baseUrl}/posts/${post.id}`, post, {
          headers
        })).data;
      } else {
        post = (await axios.post(`${baseUrl}/posts`, post, { headers })).data;
      }

      dispatch({ type: SAVE_POST_SUCCESS, post });
    } catch (error) {
      dispatch({
        type: SAVE_POST_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  };
}
