import {
  FETCH_POSTS_SUCCESS,
  FETCH_POST_SUCCESS,
  SAVE_POST_SUCCESS
} from '../constants/actions';

export default (state = { list: [], items: {} }, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      const list = action.posts.map(item => item.id);
      const items = {};

      action.posts.forEach(post => { items[post.id] = post; });

      return { list, items };

    case SAVE_POST_SUCCESS:
    case FETCH_POST_SUCCESS:
      return {
        items: {
          ...state.items,
          [action.post.id]: action.post
        },

        list: state.list
      };

    default:
      return state;
  }
};
