import React from 'react';
import { Route } from 'react-router';
import App from './App';
import SignupRoute from './SignupRoute';
import LoginRoute from './LoginRoute';
import ProfileRoute from './ProfileRoute';
import NotFound from '../components/NotFound';
import redirectBackAfter from '../utils/redirectBackAfter';
import fillStore from '../utils/fillStore';
import DashboardRoute from './DashboardRoute';
import * as Posts from './Posts';

const routes = (
  <Route component={App}>
    <Route path="/signup" component={SignupRoute} />
    <Route path="/login" component={LoginRoute} />
    <Route path="/" component={Posts.List} />
    <Route path="/posts/:id" component={Posts.View} />

    <Route requireAuth>
      <Route path="/profile" component={ProfileRoute} />
      <Route path="/dashboard" component={DashboardRoute} />
      <Route path="/dashboard/add" component={Posts.Edit} />
      <Route path="/dashboard/edit/:id" component={Posts.Edit} />
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
