import {
  LOAD_PUBLISHED_POSTS_SUCCESS,
  LOAD_PUBLISHED_POSTS_FAILURE,
  LOAD_UNPUBLISHED_POSTS_SUCCESS,
  LOAD_UNPUBLISHED_POSTS_FAILURE,
  SAVE_POST_SUCCESS
} from '../constants/actions';

function replaceById(post, posts) {
  return posts.map(item => (item.id === post.id) ? post : { ...post, ...item });
}

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_PUBLISHED_POSTS_SUCCESS:
      return [
        ...action.posts
      ];

    case LOAD_PUBLISHED_POSTS_FAILURE:
      return [
        state
      ];

    case LOAD_UNPUBLISHED_POSTS_SUCCESS:
      return [
        ...action.posts
      ];

    case LOAD_UNPUBLISHED_POSTS_FAILURE:
      return [
        state
      ];

    case SAVE_POST_SUCCESS:
      return replaceById(action.post, state);

    default:
      return [...state];
  }
};
