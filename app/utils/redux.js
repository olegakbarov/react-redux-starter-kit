/* global process */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { ROUTER_STATE_CHANGE } from '../constants/actions';
import * as reducers from '../reducers';

export function createRedux(initialState) {
  const reducer = combineReducers(reducers);
  const middleware = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({
      collapsed: true,
      predicate: (getState, action) => !(action.type === ROUTER_STATE_CHANGE)
    }));
  }

  const finalCreateStore = applyMiddleware(...middleware)(createStore);

  return finalCreateStore(reducer, initialState);
}
