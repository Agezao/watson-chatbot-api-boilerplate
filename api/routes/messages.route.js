const express = require('express'),
      validate = require('express-validation'),
      paramValidation = require('../../server-setup/param-validation'),
      messageCtrl = require('../controllers/message.controller');

const router = express.Router();

router.route('/')

  /** POST /api/messages - Send new message to watson */
  .post(validate(paramValidation.sendMessage), messageCtrl.send)

module.exports = router;
