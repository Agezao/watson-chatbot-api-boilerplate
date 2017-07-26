const Promise = require('bluebird'),
      mongoose = require('mongoose');

/**
 * Message Schema
 */
const MessageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: 'String', required: true },
  context: { type: 'String' },
  response: { type: 'Object' },
  created: { type: Date, default: Date.now }
});

/**
 * Methods
 */
MessageSchema.method({ });

/**
 * Statics
 */
MessageSchema.statics = { 
  get(params) {
    if(typeof(params) === 'object')
      return this.find(params)
        .exec();
        
    return this.findById(params)
      .exec();
  },

  create(vm) {
    let model = new this(vm);

    return model.save();
  }
  
};

/**
 * @typedef Message
 */
module.exports = mongoose.model('Message', MessageSchema);
