/* eslint-env node */
import webpack from 'webpack';
import config from './webpack.config.babel';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const bundler = webpack(config);

browserSync({
  server: {
    baseDir: '.',

    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        stats: { colors: true }

      }),

      webpackHotMiddleware(bundler),

      (req, res, next) => {
        if (req.url !== '/') { return next(); }

        fs.readFile(path.join(__dirname, 'app', 'template.html'), {
          encoding: 'utf-8'
        }, (err, source) => {
          if (err) return next(err);

          const template = _.template(source);

          res.write(template({ html: '', initialState: 'undefined' }));
          res.end();
        });
      }

    ]
  },

  files: [
    '/public/css/*.css',
    '/app/*.html'
  ]
});
