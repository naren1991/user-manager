const amqp = require('amqplib/callback_api');
const amqplib = require('amqplib')
const rabbitmqConfig = require('./config/rabbitmq.config.js')

//TODO: Error handling
exports.init = function() {
  //var amqpConn = amqp.createConnection(rabbitmqConfig.opt);
  var amqpConn = amqplib.connect(rabbitmqConfig.url, rabbitmqConfig.opt)
  /* amqp.connect(rabbitmqConfig.url + "?heartbeat=60", rabbitmqConfig.opt, function(err, conn) {
     //console.log(conn)
      if (err) {
        console.error("[AMQP]", err.message);
        return setTimeout(start, 1000);
      }
      conn.on("error", function(err) {
        if (err.message !== "Connection closing") {
          console.error("[AMQP] conn error", err.message);
        }
      });
      conn.on("close", function() {
        console.error("[AMQP] reconnecting");
        return setTimeout(start, 1000);
      });
      console.log("[AMQP] connected");
      amqpConn = conn;
      //whenConnected();
    });*/ 
    //console.log(amqpConn)
    if(amqpConn){
      console.log("[AMQP] connected");
      //whenConnected(amqpConn)
    }
    return Promise.resolve(amqpConn);
}

/*
var pubChannel = null;
var offlinePubQueue = [];

startPublisher = function (amqpConn) {
  if(amqpConn){
    amqpConn.createChannel(function(err, ch) {
      if (closeOnErr(err)) return;
        ch.on("error", function(err) {
        console.error("[AMQP] channel error", err.message);
      });
      ch.on("close", function() {
        console.log("[AMQP] channel closed");
      });
  
      ch.consume('amq.rabbitmq.reply-to', msg => eventEmitter.emit(msg.properties.correlationId, msg.content))
      
      pubChannel = ch;
      
      while (true) {
        var [exchange, routingKey, content] = offlinePubQueue.shift();
        exports.publish(exchange, routingKey, content);
        console.log("Publisher started")
      }
    });
  }
  
    
 
}

*/

exports.publish = function(channel, exchange, routingKey, content) {
    try {
      pubChannel = channel

       module.exports.consumeReply(channel);
      console.log("reply set up")

      content = new Buffer(JSON.stringify(content));
      options = {
        correlationId : Date.now().toString(),
        replyTo: 'amq.rabbitmq.reply-to', 
        persistent: true 
      }
      pubChannel.publish(exchange, routingKey, content, options,
                        function(err, ok) {
                          if (err) {
                            console.error("[AMQP] publish", err);
                            offlinePubQueue.push([exchange, routingKey, content]);
                            //pubChannel.connection.close();
                          }
                        });
    } catch (e) {
      console.error("[AMQP] publish", e.message);
      offlinePubQueue.push([exchange, routingKey, content]);
    }
  }

  exports.consumeReply = function(channel){
    try {
      channel.consume('amq.rabbitmq.reply-to', (msg) =>{ 
        console.log(msg)
        //eventEmitter.emit(msg.properties.correlationId, msg.content), {noAck: true});
        console.log("Consume reply set up")
      });
    } catch (e) {
      console.error("[AMQP] reply-to", e.message);
    }
  }