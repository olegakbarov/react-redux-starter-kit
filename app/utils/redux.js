/* global process */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from '../reducers';

export function createRedux(initialState) {
  const reducer = combineReducers(reducers);
  const middleware = [thunk];

  if (process.env.NODE_ENV === 'production') {
    middleware.push(logger);
  }

  const finalCreateStore = applyMiddleware(...middleware)(createStore);

  return finalCreateStore(reducer, initialState);
}
