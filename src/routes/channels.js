'use strict';

const express = require('express');
const handler = require('../handlers/channels');
const auth = require('../auth');
const router = express.Router();


router.use(auth);

router.get('/', handler.showChannels);

router.get('/all',
  handler.filter,
  handler.find,
  handler.showAllMessages
);

router
  .route('/:channel')
  .get(
    handler.filter,
    handler.find,
    handler.showMessages
  )
  .post(handler.create);

module.exports = router;
