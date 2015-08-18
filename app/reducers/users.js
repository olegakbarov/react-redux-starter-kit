import {
  FETCH_PROFILE_SUCCESS,

  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,

  FETCH_USERS_SUCCESS,
  FETCH_SINGLE_USER_SUCCESS
} from '../constants/actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PROFILE:
    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        [action.username]: {
          ...state[action.username],
          ...action.user
        }
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        ...action.users
      };

    case FETCH_PROFILE_SUCCESS:
    case FETCH_SINGLE_USER_SUCCESS:
      return {
        ...state,
        [action.user.username]: action.user
      };

    default:
      return state;
  }
};
