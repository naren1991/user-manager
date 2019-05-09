const User = require('../models/user.model.js');
const comms = require('../../comms/publishers/auth.publishers.js')

exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "'name' must be provided"
        });
    }

    const user = new User({
        userName: req.body.userName,
        name: req.body.name,
        authType: req.body.authType || 'google',
        email: req.body.email || ""
    })

    var authContent = {
        userName : req.body.userName,
        authType: req.body.authType || "google"
    }
    //comms.authenticateForCreation(authContent)
    
    comms.authenticate(authContent)
    console.log("auth message sent")
    res.send(authContent)
    /*
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'An unknown error occured while adding the user'
        })
    });
    */
};

exports.getAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'An unknown error occured while fetching all the users'
        })
    });
};

exports.search = (req, res) => {

    var fields = [];
    if(req.body._id){
        fields.push("_id");
    }
    if(req.body.name){
        fields.push("name");
    }
    if(req.body.authType){
        fields.push("authType");
    }
    if(req.body.email){
        fields.push("email");
    }

    var conditions = {};
    if(fields != []){
        fields.forEach(function(f){
            conditions[f] = req.body[f];     
        }) 
        
        User.find(conditions)
        .then(results => {
            res.send(results)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'An unknown error occured while searching users'
            })
        });
    }

    
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};