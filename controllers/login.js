function signin(req, res) {
    let user = require('../models/users');
    let newUser = new user ({
        name: req.body.name,
        password : req.body.password
    });
  
    newUser.save()
    .then((savedUser) => {
        //send back the created Message
        res.redirect("/user/" + savedUser._id);
            
    }, (err) => {
        res.status(400).json(err)
    });
}

function login(req, res) {
    let user = require("../models/users");
    user.findOne({name:req.body.name, password:req.body.password})
    .then((getuser) => {
        //res.status(200).json(getuser);
        res.redirect("/user/" + getuser._id);
    }, (err) => {
        res.status(500).json(err);
    });
 }


module.exports.login = login;
module.exports.signin = signin;

