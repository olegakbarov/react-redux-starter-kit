/* eslint-env node */

const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

module.exports = bunyan.createLogger({
  name: 'mediabots:probe',
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: 'info',
      type: 'raw',
      stream: prettyStdOut,
      src: true
    }
  ]
});
