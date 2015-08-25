/* eslint-env node */
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import jsonServer from 'json-server';
import config from './config';
import jwtToken from 'jsonwebtoken';
import cors from 'cors';
import fs from 'fs';
import _ from 'lodash';

const app = express();

app.use(bodyParser.json());
app.use(cors());
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

function generateToken(email, password) {
  const payload = { email, password };
  return jwtToken.sign(payload, config.token.secret, {
    expiresInMinutes: config.token.expires
  });
}

function extractToken(header) {
  return header.split(' ')[1];
}

// here comes the real hardcode
const HARDCODED_EMAIL = 'shaffernunez@nimon.com';
const HARDCODED_PASSWORD = 'ad';
const HARDCODED_USER = {
  id: 4,
  email: 'shaffernunez@nimon.com',
  password: 'ad',
  firstname: 'Diane',
  lastname: 'Murphy'
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
    const token = generateToken(email, password);
    const user = HARDCODED_USER;
    res.send({ token, user });
  } else {
    res.sendStatus(401);
  }
});

app.get('/profile', (req, res) => {
  try {
    const token = extractToken(req.headers.authorization);
    const decode = jwtToken.decode(token);
    const { email } = decode;
    const db = fs.readFile('data.json', { encoding: 'utf-8' }, (error, db) => {
      const users  = (JSON.parse(db)).users;
      const user = _.find(users, (user) => user.email === email);
      res.send(user);
    });
  } catch (error) {
    res.sendStatus(401);
  }
});

const api = jsonServer.create();

api.use(jsonServer.defaults);
api.use(jsonServer.router('data.json'));
app.use(api);
app.listen(1337);
