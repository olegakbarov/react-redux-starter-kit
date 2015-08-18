import {
  ROUTER_STATE_CHANGE
} from '../constants/actions';

export function routerStateChange(state) {
  return {
    type: ROUTER_STATE_CHANGE,
    state
  };
}
