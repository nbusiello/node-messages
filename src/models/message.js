'use strict';

const mongoose = require('mongoose');


function transform (doc, ret) {

  delete ret.__v;
  delete ret._id;
}

const options = {
  toJSON: {
    virtuals: true,
    transform
  },
  toObject: {
    virtuals: true,
    transform
  },
  timestamps: true
};

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  }
}, options);

module.exports = mongoose.model('Message', messageSchema);
