'use strict';

const mongoose = require('mongoose');

function transform (doc, ret) {

  delete ret.__v;
  delete ret._id;
  delete ret.password;
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

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, options);

module.exports = mongoose.model('User', userSchema);
