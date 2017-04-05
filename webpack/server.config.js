'use srtict';

const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  name: 'server', // This renders react when we access webview
  context: path.join(__dirname, '..'),
  target: 'node',
  entry: './src/server',
  externals: [nodeExternals()],
  devtool: 'source-map',
  output: {
    path: 'public',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [
      path.join('..', 'src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'ignore-loader'
      }
    ]
  }
};
