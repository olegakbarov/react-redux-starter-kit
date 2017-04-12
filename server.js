const express = require('express');
const cookieParser = require('cookie-parser');
const log = require('./src/utils/logger');
const app = express();

app.use(cookieParser());
app.use((req, res, next) => {
  log.info(`[${req.method}] ${req.url} ${req.body ? req.body : ''}`);
  next();
});

if (process.env.NODE_ENV === 'development') {
  log.info('Started in development mode...');

  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const webpackConfig = require('./webpack/dev.config.js');
  const compiler = webpack(webpackConfig);

  // app.use('/api/*', apiRoutes) TODO

  app.get('/assets/*', webpackDevMiddleware(compiler, {
    publicPath: '/assets/',
    hot: true,
    stats: true,
    historyApiFallback: true
  }));

  app.use(webpackHotMiddleware(
    compiler.compilers.find(compiler => compiler.name === 'client'))
  );

  app.use(webpackHotServerMiddleware(compiler));
} else {
  // app.use('/', express.static(path.join(__dirname, 'public')));
  // user built file as renderer
}

app.listen(process.env.PORT);
