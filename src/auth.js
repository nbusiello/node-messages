'use strict';

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('./models').User;
const debug = require('debug')('strategy');

passport.use(new Strategy(
  (username, password, done) => {

    User.findOne({ username, password }, (err, user) => {

      if (err) {
        return done(err);
      }
      if (!user) {
        debug('Invalid username or password');
        return done(null, false, { message: 'Invalid username or password' });
      }

      debug('login', user.id);
      done(null, user.toJSON());
    });
  }
));

passport.serializeUser((user, done) => {
  debug('serializeUser', user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {

  User.findById(id, (err, user) => {

    if (err) {
      return done(err);
    }

    debug('deserializeUser', user.id);
    done(null, user.toJSON());
  });
});

function isAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  next();
}

module.exports = isAuthenticated;
