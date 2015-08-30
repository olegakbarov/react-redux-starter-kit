/* eslint-env node */
var webpack = require('webpack');
var path = require('path');

var env = process.env.NODE_ENV || 'development';

var cfg = {
  context: path.join(__dirname, 'app'),
  entry: ['./client'],

  output: {
    path: path.join(__dirname, 'public', 'js'),
    publicPath: '/js/',
    filename: 'app.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) }
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],

  module: {
    loaders: []
  }
};

var jsLoader = {
  test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel']
};

if (env === 'production') {
  cfg.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false }
    })
  );
} else {
  cfg.debug = true;
  cfg.devtool = '#eval-source-map';

  cfg.entry.unshift(
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  );

  cfg.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );

  jsLoader.loaders.unshift('react-hot');
}

cfg.module.loaders.push(jsLoader);

module.exports = cfg;
