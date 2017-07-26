'use srict';

const MessageBusiness = require('../business/message.business'),
      WatsonBusiness = require('../business/watson.business'),
      ResponseFactory = require('../factories/response.factory');

const _responseFactory = new ResponseFactory();
const _messageBusiness = new MessageBusiness();
const _watsonBusiness = new WatsonBusiness();

// Private

const _handleMessage = (response, res) => {
  let outputMessages = [];
  let operation = {};

  response.entities.map(entity => {
    if(entity.entity == 'operacao')
      return operation.type = entity.value;

    if(entity.entity == 'sys-date' && !operation.dtIni)
      return operation.dtIni = entity.value;

    if(entity.entity == 'sys-date' && !operation.dtFim)
      return operation.dtFim = entity.value;
  });


  outputMessages.push('Opá, ta aqui!');
  if(operation.dtIni && operation.dtFim)
    outputMessages.push('O ' + operation.type + ' de ' + (!operation.dtIni ? 'hoje' : operation.dtIni) + ' até ' + (!operation.dtFim ? 'hoje' : operation.dtFim) + ' registra R$550');

  if(operation.dtIni && !operation.dtFim)
    outputMessages.push('O ' + operation.type + ' de ' + (!operation.dtIni ? 'hoje' : operation.dtIni) + ' registra R$550');

  if(!operation.dtIni && !operation.dtFim)
    outputMessages.push('O ' + operation.type + ' registra R$550');


  res.json(_responseFactory.success({text: outputMessages, context: response.context}));
};


// Public 

/**
 * Send new message
 * @property {string} req.body.message - The Text of the intented message.
 * @property {string} req.body.context - The context Id within IBM watson.
 * @returns {Color}
 */
const send = (req, res, next) => {
  _watsonBusiness.sendMessage(req.body.message, !req.body.context ? null : req.body.context)
    .then(response => {

      let vm = {
        user: !req.decoded ? null : req.decoded._id,
        message: req.body.message,
        context: response.context.conversation_id,
        response: response.output,
        created: new Date()
      };
      _messageBusiness.create(vm);

      //Get custom message when needed
      if(response.entities.length > 0)
        return _handleMessage(response, res);

      res.json(_responseFactory.success({text: response.output.text, context: response.context}));
    });
}

module.exports = { send };
