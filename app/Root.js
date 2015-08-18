/* eslint-env browser */
/* global process */

import React from 'react';
import { Router } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import cookie from './utils/cookie';
import routes from './routes';
import * as reducers from './reducers';
import { routerStateChange } from './actions/router';

const reducer = combineReducers(reducers);
const finalCreateStore = applyMiddleware(thunk)(createStore);

const store = finalCreateStore(reducer, (process.env.NODE_ENV === 'production')
  ? window.__INITIAL_STATE__
  : { auth: { token: cookie.get('token') || '' } });

export default class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <Provider store={store}>{() => (
          <Router
            history={this.props.history}
            routes={routes(store, true)}

            onUpdate={function() {
              store.dispatch(routerStateChange(this.state));
            }}
          />
        )}</Provider>
      </div>
    );
  }
}
