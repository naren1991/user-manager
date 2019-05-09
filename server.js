//TODO: Consolidate all entity CRUD services into one template, instantiated entity type 

const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is listening on port 3000");
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "Welcome to the the set of web services to manage feed sources"});
});

module.exports = app;


//feed source
const userRouter = require('./api/routes/user.route.js');
app.use('/user', userRouter);


// Configuring the database
const dbConfig = require('./api/config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//rabbitmq initialize

const comms = require('./comms/comms.js')
const rabbitmqConfig = require('./comms/config/rabbitmq.config.js')

offlinePubQueue = []
global.amqpConn = comms.init();
amqpConn.then(function(conn){
    return conn.createChannel();
}).then(function(ch) {
    global.amqpChannel = ch
    ch.assertExchange(rabbitmqConfig.authExchange).then(function(ok) {
        console.log("Auth exchange ready")
    });
}).catch(console.warn);
    






