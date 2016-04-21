'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const hbs = require('./src/engine');
const routes = require('./src/routes');
const logger = require('./src/logger');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

require('./src/auth');
require('./src/db');

// Setup server

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(morgan('dev'));
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

// Socket.io

app.use((req, res, next) => {

  req.io = io;
  next();
});

// Routes

app.use('/public', express.static('public'));
app.use('/login', routes.login);
app.use('/channels', routes.channels);

// app.all('*', (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect('/login');
//   }
//   res.redirect('/channels');
// });

const port = process.env.PORT || 3000;

server.listen(port, () => {
  logger.info('Server listening on port', port);
});
