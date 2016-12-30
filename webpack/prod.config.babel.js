/* eslint-env node */
const webpack = require('webpack');
const path = require('path');
const cssnext = require('cssnext');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const bundle = process.env.BUNDLE || 'client';

const cfg = {
  devtool: 'source-map',
  context: path.join(__dirname, '../app'),
  entry: ['./' + bundle],

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { screw_ie8: true },
      output: { comments: false }
    }),
    new ExtractTextPlugin('css/[name].css', { allChunks: true })
  ],

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      }
    ]
  },

  postcss: () => {
    return [cssnext];
  }
};

if (bundle === 'server') {
  cfg.target = 'node';

  cfg.node = {
    __filename: false,
    __dirname: false,
    console: false
  };

  cfg.output = {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
    filename: '../app/server-bundle.js'
  };

  cfg.module.loaders.push({
    test: /\.styl$/,
    loader: 'css/locals?modules!stylus'
  });
} else {
  cfg.target = 'web';

  cfg.module.loaders.push({
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract('style', 'css?modules!stylus')
  });

  cfg.output = {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
    filename: 'js/app.js'
  };
}

module.exports = cfg;
