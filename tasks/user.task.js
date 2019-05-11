const User = require('./models/user.model.js');
const comms = require('../comms/publishers/auth.publishers.js')
const userEvent= require('./events/user.event.js')


exports.authenticate = (req) => {

    return new Promise(function(resolve, reject){
        var res = null
        var authContent = {
            userName : req.body.userName,
            authType: req.body.authType || "google"
        }

        var config = {
            correlationId : Date.now().toString()
        }
        comms.authenticate(authContent, config)
        console.log("auth message sent")

        userEvent.userEventEmitter.on(userEvent.authComplete, function(res){
            //TODO: Add auth success check here
            if(res.properties.correlationId == config.correlationId){
                resolve(res.content)
            }

            //TODO: HOw to handle failure
            
        })
    })
}

exports.createEntry = (req) => {
    return new Promise(function(resolve, reject){
        var res = null
        const user = new User({
            userName: req.body.userName,
            name: req.body.name,
            authType: req.body.authType || 'google',
            email: req.body.email || ""
        })
        
        user.save()
        .then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })

}

exports.search = (req) => {
    var res = null
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
            res = results
        });
    }

    return res
}