import {
  FETCH_SINGLE_USER_SUCCESS
} from '../constants/actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_USER_SUCCESS:
      return {
        ...state,
        [action.user.id]: action.user
      };

    default:
      return state;
  }
};
