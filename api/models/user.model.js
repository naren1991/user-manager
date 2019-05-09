const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: String,
    name: String,
    authType: {
        type: String,
        enum: ['google'],
        lowercase : true,
        trim: true
    },
    email: String
}, {
    timestamps : true
})

module.exports = mongoose.model('User', userSchema)