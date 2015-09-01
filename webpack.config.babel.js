/* eslint-env node */
import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import csswring from 'csswring';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const env = process.env.NODE_ENV || 'development';

const cfg = {
  context: path.join(__dirname, 'app'),
  entry: ['./client'],

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
    new webpack.optimize.DedupePlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader?modules!stylus-loader'
      }
    ]
  },

  postcss: () => {
    return [autoprefixer, csswring];
  }
};

const jsLoader = {
  test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel']
};

const hotCssLoader = {
  test: /\.styl$/,
  loader: ExtractTextPlugin(
    'css-loader?modules&importLoaders=1&' +
    'localIdentName=[name]__[local]___[hash:base64:5]' +
    '!postcss-loader!stylus-loader'
  )
};

if (env === 'production') {
  cfg.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false }
    }),
    new ExtractTextPlugin('css/[name].css')
  );

  cfg.plugins.loaders.push(hotCssLoader);
} else {
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
