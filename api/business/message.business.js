'use strict';
const crypto = require('crypto'),
      Promisse = require('bluebird'),
      Message = require('../models/message.model');

class MessageBusiness {

	constructor() { }

    /*
    * Params could be either a json or a single Id
    */
    get(params) {
        return Message.get(params);
    };

    create(vm) {
        return Message.create(vm);
    };
}

module.exports = MessageBusiness;