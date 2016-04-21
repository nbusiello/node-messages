'use strict';

const mongoose = require('mongoose');
const moment = require('moment');


function transform (doc, ret) {

  delete ret.__v;
  delete ret._id;
  delete ret.id;
  delete ret.channel;
  delete ret.createdAt;
  delete ret.updatedAt;
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

messageSchema.virtual('ago').get(function () {
  return moment(this.createdAt).fromNow();
});

module.exports = mongoose.model('Message', messageSchema);
