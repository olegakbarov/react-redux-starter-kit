import {
  LOAD_PUBLISHED_POSTS_SUCCESS,
  LOAD_PUBLISHED_POSTS_FAILURE,
  LOAD_UNPUBLISHED_POSTS_SUCCESS,
  LOAD_UNPUBLISHED_POSTS_FAILURE,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE
} from '../constants/actions';
import * as api from '../api/app';

export function fetchPublishedPosts() {
  return async (dispatch) => {
    try {
      const posts = await api.fetchPublishedPosts();
      dispatch({ type: LOAD_PUBLISHED_POSTS_SUCCESS, posts });
    } catch (error) {
      dispatch({ type: LOAD_PUBLISHED_POSTS_FAILURE, error });
    }
  };
}

export function fetchUnpublishedPosts() {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      const posts = await api.fetchUnpublishedPosts(token);
      dispatch({ type: LOAD_UNPUBLISHED_POSTS_SUCCESS, posts });
    } catch (error) {
      dispatch({ type: LOAD_UNPUBLISHED_POSTS_FAILURE, error });
    }
  };
}

export function savePost(post) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      post = await api.savePost(token, post);
      dispatch({ type: SAVE_POST_SUCCESS, post });
    } catch (error) {
      dispatch({ type: SAVE_POST_FAILURE, error });
    }
  };
}
