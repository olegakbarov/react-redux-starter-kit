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
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('css/[name].css')
  ],

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!stylus-loader') //eslint-disable-line
      }]
  },

  postcss: () => {
    return [autoprefixer, csswring];
  }
};

const jsLoader = {
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
    new webpack.NoErrorsPlugin(),
  );

  jsLoader.loaders.unshift('react-hot');
}

cfg.module.loaders.push(jsLoader);

module.exports = cfg;
