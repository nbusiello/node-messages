'use strict';

const moment = require('moment');


exports.ago = (date) => {
  return moment(date).fromNow();
};
