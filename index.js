'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./src/routes');

const app = express();

require('./src/db');
require('./src/auth');

// Setup server

app.set('views', './src/views');
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'mogumbo',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/login', routes.login);
app.use('/channels', routes.channels);
app.all('*', (req, res) => res.status(404).send('Not found'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
