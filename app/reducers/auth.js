import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT,

  FETCH_PROFILE_SUCCESS
} from '../constants/actions';

const initialState = {
  lastError: null,
  token: null,
  username: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        lastError: null,
        token: action.token,
        isExpert: action.user.expert
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        lastError: action.error
      };

    case LOGOUT:
      return { ...initialState };

    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        lastError: null,
        username: action.user.username,
        isExpert: action.user.expert
      };

    default:
      return state;
  }
};
