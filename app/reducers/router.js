
import Actions from '../constants/actions';
const {
  ROUTER_STATE_CHANGE
} = Actions;

export default (state = null, action) => {
  switch (action.type) {
    case ROUTER_STATE_CHANGE:
      return action.state;

    default:
      return state;
  }
};
