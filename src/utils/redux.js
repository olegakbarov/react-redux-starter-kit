/* eslint-env commonjs */
/* global process */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { ROUTER_STATE_CHANGE } from '../constants/actions';
import reducer from '../reducers';

export function createRedux(initialState) {
  const middleware = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({
      collapsed: true,
      predicate: (getState, action) => !(action.type === ROUTER_STATE_CHANGE)
    }));
  }

  const finalCreateStore = applyMiddleware(...middleware)(createStore);
  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    const nextReducer = require('../reducers');
    module.hot.accept('../reducers',
      () => { store.replaceReducer(nextReducer); });
  }

  return store;
}
