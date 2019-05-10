const rabbitmqConfig = require('../config/rabbitmq.config.js')
const comms = require('../comms.js')

exports.authenticate = function(content){
    comms.publish(amqpChannel, rabbitmqConfig.authExchange, rabbitmqConfig.authKey,
        content)
    console.log("published", content)
}


