import React from 'react';
import { Route } from 'react-router';
import App from './App';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import NotFound from './NotFound';
import redirectBackAfter from '../utils/redirectBackAfter';
import fillStore from '../utils/fillStore';
import Dashboard from './Dashboard';
import * as Posts from './Posts';

const routes = (
  <Route component={App}>
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/" component={Posts.List} />
    <Route path="/posts/:id" component={Posts.View} />

    <Route requireAuth>
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/add" component={Posts.Edit} />
      <Route path="/dashboard/add/:id" component={Posts.Edit} />
    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);

function walk(routes, cb) {
  cb(routes);

  if (routes.childRoutes) {
    routes.childRoutes.forEach(route => walk(route, cb));
  }

  return routes;
}

export default (store, client) => {
  return walk(Route.createRouteFromReactElement(routes), route => {
    route.onEnter = (nextState, transition) => {
      const loggedIn = !!store.getState().auth.token;

      if (route.requireAuth && !loggedIn) {
        transition.to(...redirectBackAfter('/login', nextState));
      } else if (client) {
        fillStore(store, nextState, [route.component]);
      }
    };
  });
};
