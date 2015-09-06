/* eslint-env node */
import webpack from 'webpack';
import path from 'path';
import cssnext from 'cssnext';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const env = process.env.NODE_ENV || 'development';
const bundle = process.env.BUNDLE || 'client';

const cfg = {
  context: path.join(__dirname, 'app'),
  entry: ['./' + bundle],

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],

  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }]
  },

  postcss: () => {
    return [cssnext];
  }
};

const jsLoader = {
  test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel']
};

if (bundle === 'server') {
  cfg.target = 'node';

  cfg.node = {
    __filename: false,
    __dirname: false,
    console: false
  };

  cfg.output = {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: '../app/server-bundle.js'
  };

  cfg.module.loaders.push({
    test: /\.styl$/,
    loader: 'css/locals?modules!stylus'
  });
} else {
  cfg.target = 'web';

  cfg.output = {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/app.js'
  };

  if (env === 'production') {
    cfg.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        output: { comments: false }
      }),

      new ExtractTextPlugin('css/[name].css')
    );

    cfg.module.loaders.push({
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules!stylus'
      )
    });
  } else {
    cfg.module.loaders.push({
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.styl$/,
      loader:
        'style!css?modules&localIdentName=[local]___[hash:base64:10]!stylus'
    });
  }
}

if (env !== 'production') {
  cfg.debug = true;
  cfg.devtool = '#eval-source-map';

  cfg.entry.unshift(
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  );

  cfg.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  );

  jsLoader.loaders.unshift('react-hot');
}

cfg.module.loaders.push(jsLoader);

module.exports = cfg;
