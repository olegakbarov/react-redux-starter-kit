import Actions from '../constants/actions';
const {
  ROUTER_STATE_CHANGE
} = Actions;

export function routerStateChange(state) {
  return {
    type: ROUTER_STATE_CHANGE,
    state
  };
}
