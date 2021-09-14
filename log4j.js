const log4js = require('log4js'); // include log4js

log4js.configure({
  appenders: { cheese: { type: 'file', filename: './log/log.log', maxLogSize: 20000, backups: 10 } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');

module.exports = logger