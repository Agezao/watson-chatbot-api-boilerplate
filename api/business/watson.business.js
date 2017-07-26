const watson = require('watson-developer-cloud'),
			Promise = require('bluebird'),
			config = require('../../config');

const conversation = watson.conversation({
    url: 'https://gateway.watsonplatform.net/conversation/api',
    username: config.watson_user,
    password: config.watson_password,
    version: 'v1',
    version_date: '2017-04-21'
});
const workspace = config.watson_workspace;

class WatsonBusiness {
	constructor() { }

	//

	sendMessage(message, context) {
		let messagePayload = {
			input: { text: message },
			workspace_id: workspace
		};

		if(context)
			messagePayload.context = context;

		return new Promise(function(resolve, reject) {
      conversation.message(messagePayload, function(err, response) {
      	if(!err)
      		return resolve(response);
    		
    		return reject(err);
      });
    });
	}

}

module.exports = WatsonBusiness;