/* eslint-env node */
var webpack = require('webpack');
var common = require('./webpack.common');
var _ = require('lodash');

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

module.exports = _.assign({}, common, {
  debug: true,
  devtool: '#eval-source-map',

  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './client'
  ],

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }
    ]
  }
});
