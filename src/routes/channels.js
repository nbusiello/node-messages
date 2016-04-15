'use strict';

const express = require('express');
const Message = require('../models/message');
const router = express.Router();

function filter(req, res, next) {

  const channel = req.params.channel;
  if (channel) {
    req.conditions = { channel };
  }

  next();
}

function find(req, res, next) {

  Message
    .find(req.conditions)
    .sort('-createdAt')
    .exec((err, messages) => {

      if (err) {
        return next(err);
      }

      req.messages = messages;
      next();
    });
}

function create(req, res, next) {

  const channel = req.params.channel;
  const payload = req.body;

  payload.channel = channel;

  Message.create(payload, (err, message) => {

    if (err) {
      return next(err);
    }
    next();
  });
}

function showMessages(req, res) {

  res.render('messages', {
    messages: req.messages,
    channel: req.params.channel
  });
}

router.get('/', (req, res) => {

  Message
    .aggregate()
    .group({ _id: '$channel', count: { $sum: 1 } })
    .sort('_id')
    .exec((err, channels) => {

      if (err) {
        return res.status(500).send();
      }

      res.render('channels', { channels });
    });
});

router.get('/all', filter, find, (req, res) => {

  res.render('messages', { messages: req.messages });
});

router
  .route('/:channel')
  .get(filter, find, showMessages)
  .post(create, filter, find, showMessages);

module.exports = router;
