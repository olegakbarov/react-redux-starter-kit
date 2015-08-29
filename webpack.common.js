/* eslint-env node */
var path = require('path');

module.exports = {
  context: path.join(__dirname, 'app'),

  output: {
    path: path.join(__dirname, 'public', 'js'),
    publicPath: '/js/',
    filename: 'app.js'
  }
};
