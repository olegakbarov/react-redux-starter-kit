
import { cloneDeep } from 'lodash';

export default (state = {}, action) => {
  const newState = cloneDeep(state);

  switch (action.type) {
    case 'NOTIF_DISMISS':
      delete newState[action.id];

      return newState;

    case 'NOTIF_ADD':
      action.notif.type = action.notif.type || 'error';
      action.notif.timeout = action.notif.timeout || 2000;
      newState[action.notif.id] = action.notif;

      return newState;

    case 'NOTIF_CLEAR':
      return {};

    default:
      return state;
  }
};
