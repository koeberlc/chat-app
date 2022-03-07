function createMessage(req, res) {
    let Message = require('../models/messages');
    let newMessage = Message ({
        users: [req.params.id1,req.params.id2],
        message : req.body.message
    });
  
    newMessage.save()
    .then((savedMessage) => {

        //send back the created Message
        res.json(savedMessage);
            
    }, (err) => {
        res.status(400).json(err)
    });
}

function readMessages(req, res) {

    let Message = require("../models/messages");

    Message.find({users: {$in: [[req.params.id1,req.params.id2], [req.params.id2,req.params.id1]]}})
    .then((messages) => {
        res.status(200).json(messages);
    }, (err) => {
        res.status(500).json(err);
    });
}

function readUsers(req, res) {

    let User = require("../models/users");

    User.find({})
    .then((users) => {
        res.status(200).json(users);
    }, (err) => {
        res.status(500).json(err);
    });
}


module.exports.create = createMessage;
module.exports.reads = readMessages;
module.exports.readUsers = readUsers;
