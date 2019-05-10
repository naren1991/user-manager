//TODO: Have a clean separation between the REST API and messaging interaction - Done (REVIEW)
//TODO: Error handling - Done (REVIEW)
//TODO: What happens for failed/ timed out requests - Need to handle

const userTask = require('../../tasks/user.task.js')

exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "'name' must be provided"
        });
    }

    userTask.authenticate(req)
    .then(data => {
        return userTask.createEntry(req)
    })
    .then(data => {
        res.send(data)
    })
    .catch( err => {
        console.log(err);
    });

};

exports.search = (req, res) => {
    var results = userTask.search(req)
    res.send(results)
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};