'use strict';

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const Message = require('./src/models/message');
const channels = require('./src/routes/channels');

const app = express();

// Connect to db

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    throw err;
  }

  console.log('Mongoose connected!');
});

require('./src/auth/strategy');

// Setup server

app.set('views', './src/views');
app.set('view engine', 'jade');

const accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }));
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

// Auth

app.get('/login', (req, res) => {
  res.render('login', {});
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/channels',
  failureRedirect: '/login'
}));

// Routes

function isAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  next();
}

app.all('*', isAuthenticated);

app.use('/channels', channels);

app.all('*', (req, res) => {

  res.status(404).send('Not found. Press back in the browser history!')
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});
