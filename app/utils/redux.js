import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

export function createRedux(initialState) {
  const reducer = combineReducers(reducers);
  const finalCreateStore = applyMiddleware(thunk)(createStore);

  return finalCreateStore(reducer, initialState);
}
