/* eslint-env node */
import 'babel/polyfill';
import express from 'express';
import cookieParser from 'cookie-parser';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { Router } from 'react-router';
import Location from 'react-router/lib/Location';
import { Provider } from 'react-redux';
import routes from './routes';
import { createRedux } from './utils/redux';
import fillStore from './utils/fillStore';
import stringifyLocation from './utils/stringifyLocation';

const env = process.env.NODE_ENV || 'development';
const app = express();

app.use(cookieParser());
app.use(express.static('public'));

const templatePath = path.join(__dirname, 'template.html');
const templateSource = fs.readFileSync(templatePath, { encoding: 'utf-8' });
const template = _.template(templateSource);

app.use((req, res, next) => {
  const location = new Location(req.path, req.query);
  const token = req.cookies.token;
  const store = createRedux({ auth: { token } });

  Router.run(routes(store, false), location, async (err, state, transition) => {
    if (err) { return next(err); }

    const { isCancelled, redirectInfo } = transition;

    if (isCancelled) {
      return res.redirect(stringifyLocation(redirectInfo));
    }

    await fillStore(store, state, state.components);

    const html = React.renderToString(
      <Provider store={store}>
        <Router {...state} />
      </Provider>
    );

    const initialState = JSON.stringify(store.getState());

    if (state.params.splat) {
      res.status(404);
    }

    res.send(template({ html, initialState, env }));
  });
});

app.listen(3000);
