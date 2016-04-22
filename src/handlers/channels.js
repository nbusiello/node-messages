'use strict';

const Message = require('../models').Message;

exports.filter = function (req, res, next) {

  const channel = req.params.channel;
  if (channel) {
    req.conditions = { channel };
  }

  next();
}

exports.find = function (req, res, next) {

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

exports.create = function (req, res) {

  const channel = req.params.channel;
  const payload = req.body;

  payload.channel = channel;

  Message.create(payload, (err, message) => {

    if (err) {
      return res.status(500).send();
    }

    req.io.emit('message', message.toJSON());
    res.status(201).send();
  });
}

exports.showMessages = function (req, res) {

  res.render('messages', {
    messages: req.messages,
    channel: req.params.channel
  });
}

exports.showChannels = function (req, res) {

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
}

exports.showAllMessages = function (req, res) {

  res.render('messages', { messages: req.messages });
}
