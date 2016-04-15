'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    throw err;
  }

  console.log('Mongoose connected!');
});
