/* eslint-env node */
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import del from 'del';
import { sprite as icons } from 'evil-icons';
import bootstrap from 'bootstrap-styl';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer-core';
import csswring from 'csswring';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackDevConfig from './webpack.dev';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

var plugins = loadPlugins();

gulp.task('clean', function(cb) {
  del([
    'public/css',
    'public/js'
  ], cb);
});

gulp.task('css', function() {
  var processors = [
    postcssImport,

    autoprefixer({
      browsers: [
        'last 2 versions',
        '> 1%',
        'Opera >= 12',
        'Android >= 2.3',
        'IE >= 9'
      ]
    }),

    csswring
  ];

  return gulp.src('stylus/*.styl', { base: 'public/css' })
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
    .pipe(plugins.stylus({ use: bootstrap() }))
    .pipe(plugins.postcss(processors))
    .pipe(plugins.concat('app.css'))
    .pipe(plugins.sourcemaps.write('.', { includeContent: false }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('js', function(cb) {
  webpack(webpackConfig, cb);
});

gulp.task('build', ['css', 'js']);

gulp.task('watch', ['css'], function() {
  gulp.watch('stylus/**/*.styl', ['css']);
});

gulp.task('default', ['watch'], function(cb) {
  var bs = browserSync.create();
  var bundler = webpack(webpackDevConfig);

  bs.init({
    open: false,
    ui: false,
    ghostMode: false,

    server: {
      baseDir: 'public',

      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackDevConfig.output.publicPath,
          stats: { colors: true }
        }),

        webpackHotMiddleware(bundler),

        function(req, res, next) {
          if (req.url !== '/') { return next(); }

          fs.readFile(path.join(__dirname, 'app', 'template.html'), {
            encoding: 'utf-8'
          }, function(err, source) {
            if (err) { return next(err); }

            var template = _.template(source);

            res.write(template({
              icons,
              html: '',
              initialState: 'undefined'
            }));

            res.end();
          });
        }
      ]
    },

    files: [
      'public/css/*.css',
      'app/template.html'
    ]
  }, cb);
});
