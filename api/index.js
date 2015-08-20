/* eslint-env node */
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import jsonServer from 'json-server';
import config from './config';

const app = express();

app.use(bodyParser.json());

app.use(jwt({
  secret: config.token.secret
}).unless(req => {
  const url = req.originalUrl;
  const postsRE = /^\/posts(\/.*)?$/;

  return (
      url === '/signup' ||
      url === '/login' ||
      (postsRE).test(url) && req.method === 'GET'
  );
}));

const api = jsonServer.create();

api.use(jsonServer.defaults);
api.use(jsonServer.router('data.json'));

app.use(api);

if (!module.parent) {
  app.listen(1337);
}

export default app;
