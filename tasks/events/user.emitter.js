const EventEmitter = require('events');
const userEventEmitter = new EventEmitter();

const authComplete = 'auth-complete';
module.exports = {userEventEmitter, authComplete};