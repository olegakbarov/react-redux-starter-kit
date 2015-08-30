import {
  FETCH_POSTS_SUCCESS,
  FETCH_POST_SUCCESS,
  SAVE_POST_SUCCESS
} from '../constants/actions';

function getInitialListState() {
  return { list: [], items: {} };
}

function storeList(itemList) {
  const list = itemList.map(item => item.id);
  const items = {};

  itemList.forEach(post => { items[post.id] = post; });

  return { list, items };
}

function storeItem({ list, items }, item) {
  return { items: { ...items, [item.id]: item }, list };
}

export default (state = getInitialListState(), action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return storeList(action.posts);

    case SAVE_POST_SUCCESS:
    case FETCH_POST_SUCCESS:
      return storeItem(state, action.post);

    default:
      return state;
  }
};
