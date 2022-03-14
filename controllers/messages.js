function readMessages(req, res) {

    let Message = require("../models/messages");
    let User = require("../models/users");

    User.find({})
    .then((users) => {
        Message.find({users: {$in: [[req.params.id,req.params.id2], [req.params.id2,req.params.id]]}})
        .then((messages) => {
            res.render("user.ejs", {currentUser:req.params.id, otherUser:req.params.id2, users:users, msg:messages})
        }, (err) => {
            res.status(500).json(err);
        });
    }, (err) => {
        res.status(500).json(err);
    });
    
}

function readUsers(req, res) {

    let User = require("../models/users");

    User.find({})
    .then((users) => {
        res.render("user.ejs", {currentUser:req.params.id, users:users, msg:null})
    }, (err) => {
        res.status(500).json(err);
    });
}



module.exports.reads = readMessages;
module.exports.readUsers = readUsers;
