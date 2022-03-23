function readMessages(req, res) {

    let Message = require("../models/messages");
    let User = require("../models/users");

    User.find({})
    .then((users) => {
        Message.find({users: {$in: [[req.params.id,req.params.id2], [req.params.id2,req.params.id]]}})
        .then((messages) => {
            console.log("usersReadMsg");
            console.log(users);
            console.log("MessageReadMsg");
            console.log(messages);
            User.find({_id:req.params.id})
            .then((user1) => {
                User.find({_id:req.params.id2})
                .then((user2) => {
                    console.log(user1)
                    console.log(user2)
                    res.render("user.ejs", {currentUser:user1[0], otherUser:user2[0], users:users, msg:messages});
                }, (err) => {
                    res.status(500).json(err);
                });
            }, (err) => {
                res.status(500).json(err);
            });
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
        User.find({_id:req.params.id})
        .then((user1) => {
            console.log("zefgzdfgrfez")
            console.log(user1[0]);
            res.render("user.ejs", {currentUser:user1[0], otherUser:null, users:users, msg:null});
        }, (err) => {
            res.status(500).json(err);
        });  
    }, (err) => {
        res.status(500).json(err);
    });
}


module.exports.reads = readMessages;
module.exports.readUsers = readUsers;
