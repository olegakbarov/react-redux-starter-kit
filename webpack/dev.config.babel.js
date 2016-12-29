/* eslint-env node */
const webpack = require('webpack');
const path = require('path');
const cssnext = require('cssnext');

const bundle = process.env.BUNDLE || 'client';
const env = process.env.NODE_ENV || 'development';

module.exports = {
  debug: true,
  devtool: bundle === 'server'
    ? 'source-map'
    : 'eval-cheap-module-source-map',
  context: path.join(__dirname, '../app'),
  entry: [
    '../app/client',
    'webpack-hot-middleware/client'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/app.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
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
        loader: 'style!css'
      },
      {
        test: /\.styl$/,
        loader: 'style!css?modules&localIdentName=[local]___[hash:base64:10]!stylus' // eslint-disable-line
      }
    ]
  },

  postcss: () => {
    return [cssnext];
  }
};
