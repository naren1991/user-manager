const rabbitmqConfig = require('../config/rabbitmq.config.js')
const comms = require('../comms.js')

exports.authenticate = function(content, config){
    comms.publish(amqpChannel, rabbitmqConfig.authExchange, rabbitmqConfig.authKey,
        content, config)
    console.log("published", content)
}


