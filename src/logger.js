'use strict';

const winston = require('winston');


const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true
    })
  ]
});

module.exports = logger;
