import {
  LOAD_PUBLISHED_POSTS_SUCCESS,
  LOAD_PUBLISHED_POSTS_FAILURE,
  LOAD_UNPUBLISHED_POSTS_SUCCESS,
  LOAD_UNPUBLISHED_POSTS_FAILURE,
  LOAD_SINGLE_POST_SUCCESS,
  LOAD_SINGLE_POST_FAILURE,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE
} from '../constants/actions';
import axios from 'axios';

const baseUrl = 'http://localhost:1337';
import getHeaders from '../utils/getHeaders.js';

export function fetchPublishedPosts() {
  return async (dispatch) => {
    try {
      const posts = (await axios.get(`${baseUrl}/posts`)).data;
      dispatch({ type: LOAD_PUBLISHED_POSTS_SUCCESS, posts });
    } catch (error) {
      dispatch({
        type: LOAD_PUBLISHED_POSTS_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  };
}

export function fetchSinglePost(id) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      const headers = getHeaders(token);

      const post = (await axios.get(`${baseUrl}/posts/${id}`, {
        headers
      })).data;

      dispatch({ type: LOAD_SINGLE_POST_SUCCESS, post });
    } catch (error) {
      dispatch({
        type: LOAD_SINGLE_POST_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  };
}

export function fetchUnpublishedPosts() {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      let headers = getHeaders(token);

      const posts = (await axios.get(
        `${baseUrl}/posts/?drafts`,
        { headers })).data;

      dispatch({ type: LOAD_UNPUBLISHED_POSTS_SUCCESS, posts });
    } catch (error) {
      dispatch({
        type: LOAD_UNPUBLISHED_POSTS_FAILURE,
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
