/* eslint-env node */
import express from 'express';
import cookieParser from 'cookie-parser';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import { sprite as icons } from 'evil-icons';
import React from 'react';
import { Router } from 'react-router';
import Location from 'react-router/lib/Location';
import { createStore } from 'redux';
import { Provider } from 'redux/react';
import routes from './routes';
import * as reducers from './reducers';
import fillStore from './utils/fillStore';
import stringifyLocation from './utils/stringifyLocation';

const app = express();

app.use(cookieParser());
app.use(express.static('public'));

const templatePath = path.join(__dirname, 'template.html');
const templateSource = fs.readFileSync(templatePath, { encoding: 'utf-8' });
const template = _.template(templateSource);

app.use((req, res, next) => {
  const location = new Location(req.path, req.query);
  const token = req.cookies.token;
  const store = createStore(reducers, { auth: { token } });

  Router.run(routes(store, false), location, async (err, state, transition) => {
    if (err) { return next(err); }

    const { isCancelled, redirectInfo } = transition;

    if (isCancelled) {
      return res.redirect(stringifyLocation(redirectInfo));
    }

    await fillStore(store, state, state.components);

    const html = React.renderToString(
      <Provider store={store}>
        {() => <Router {...state} />}
      </Provider>
    );

    const initialState = JSON.stringify(store.getState());

    if (state.params.splat) {
      res.status(404);
    }

    res.send(template({ icons, html, initialState }));
  });
});

app.listen(3000);
