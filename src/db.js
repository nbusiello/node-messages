'use strict';

const mongoose = require('mongoose');
const logger = require('./logger');


mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    throw err;
  }

  logger.info('Mongoose connected!');
});
