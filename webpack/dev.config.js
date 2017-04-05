
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dist = path.join(__dirname, 'build');

module.exports = [{
  context: path.join(__dirname, '..'),
  name: 'client',
  target: 'web',
  entry: './src/client', // this runs the clientside js bundle
  output: {
    path: dist,
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      path.join('..', 'src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(svg|png|jpe?g)$/,
        use: 'file-loader?name=images/[hash].[ext]'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]__[hash:base64:10]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
}, {
  context: path.join(__dirname, '..'),
  name: 'server', // This renders react when we access webview
  target: 'node',
  entry: './src/server',
  externals: [nodeExternals()],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '..', 'src'), // for webpack middleware
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
}];
