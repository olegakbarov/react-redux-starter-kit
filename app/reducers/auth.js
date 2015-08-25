import {
  ROUTER_STATE_CHANGE,

  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  SIGNUP_FAILURE,

  LOGOUT,

  FETCH_PROFILE_SUCCESS
} from '../constants/actions';

const initialState = {
  error: null, // last occured error
  token: null,
  profile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUTER_STATE_CHANGE:
      return {
        ...state,
        error: null
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        token: action.token
      };

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case LOGOUT:
      return { ...initialState };

    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, ...action.user },
        error: null
      };

    default:
      return state;
  }
};
