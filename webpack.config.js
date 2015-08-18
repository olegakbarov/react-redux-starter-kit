/* eslint-env node */
var webpack = require('webpack');
var common = require('./webpack.common');
var _ = require('lodash');

module.exports = _.assign({}, common, {
  entry: './client',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] }
    ]
  }
});
