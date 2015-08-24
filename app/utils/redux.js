import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import loggerMiddleware from 'redux-logger';

export function createRedux(initialState) {
  const reducer = combineReducers(reducers);
  const finalCreateStore = applyMiddleware(
    thunk,
    loggerMiddleware
  )(createStore);

  return finalCreateStore(reducer, initialState);
}
