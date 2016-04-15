'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

router
  .route('/')
  .get((req, res) => {
    res.render('login', {});
  })
  .post(passport.authenticate('local', {
    successRedirect: '/channels',
    failureRedirect: '/login'
  }));

module.exports = router;
