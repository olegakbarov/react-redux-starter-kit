/* eslint-env node */
import webpack from 'webpack';
import path from 'path';
import cssnext from 'cssnext';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const bundle = process.env.BUNDLE || 'client';

const cfg = {
  context: path.join(__dirname, '../app'),
  entry: ['./' + bundle],

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      __DEVTOOLS__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('css/[name].css', { allChunks: true })
  ],

  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') }
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