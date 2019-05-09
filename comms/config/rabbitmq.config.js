module.exports = {
    url: 'amqp://localhost:5672',
    opt: {
        host: 'localhost',
        port: 5672,
        username: 'melange',
        password: 'melange',
        authMechanism: 'AMQPLAIN'
    },
    credentials: require('amqplib').credentials.plain('melange', 'melange'),
    //Exhanges used by this microservice
    authExchange: 'authenticate.requests',
    authKey: 'authenticate',
    //authCreateKey: 'create',
    //authLoginKey: 'login'
    //
}