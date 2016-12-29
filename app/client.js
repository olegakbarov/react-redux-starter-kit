/* eslint-env browser */
/* global process */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import * as ReactRouter from 'react-router';
import { browserHistory, hashHistory } from 'react-router';
import Root from './Root';

const history = (process.env.NODE_ENV === 'production')
  ? browserHistory
  : hashHistory;

render(
  <Root {...{ history }} />,
  document.getElementById('app')
);
