/* eslint-env node, es6 */

import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import createLoggerMiddleware from 'redux-logger';
// import RavenMiddleware from 'redux-raven-middleware';
import currentsMiddleware from './middleware/metadata';

const createStoreWithMiddleware = applyMiddleware(
  // RavenMiddleware(process.env.SENTRY_DSN /* sentryConfig, stateTrans-func*/),
  createLoggerMiddleware(),
  thunkMiddleware,
  currentsMiddleware()
)(createStore);

export default function configureStore(state = {}) {
  const store = createStoreWithMiddleware(reducer, state);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      System.import('./reducer').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
