const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  name: 'client',
  context: path.join(__dirname, '..'),
  target: 'web',
  entry: './src/client',
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  devtool: env === 'development' ? 'source-map' : 'cheap-module-source-map',
  resolve: {
    modules: [
      path.resolve('../src'),
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
};
