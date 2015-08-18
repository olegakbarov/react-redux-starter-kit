import {
  SAVE_DRAFT,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT_FAILURE,
  PUBLISH_POST
} from '../constants/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_DRAFT:
      return {
        ...action.state
      };

    case SAVE_DRAFT_SUCCESS:
      return {
        ...state,
        ...action.draft
      };

    case SAVE_DRAFT_FAILURE:
      return state;

    case PUBLISH_POST:
      return state;

    default:
      return state;
  }
};
