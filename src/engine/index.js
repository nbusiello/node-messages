'use strict';

const exphbs = require('express-handlebars');
const helpers = require('./helpers');


module.exports = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers
});
