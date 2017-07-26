const Joi = require('joi');

module.exports = {

  // POST /api/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/signup
  signup: {
    body: {
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // UPDATE /api/user
  updateUser: {
    body: {
      name: Joi.string().required(),
      password: Joi.string()
    }
  },

  // POST /api/messages
  sendMessage: {
    body: {
      message: Joi.string().required(),
      context: Joi.object()
    }
  }
};
