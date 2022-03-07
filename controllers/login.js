function signin(req, res) {
    let user = require('../models/users');
    console.log(req.body);
    let newUser = new user ({
        name: req.body.name,
        password : req.body.password
    });
  
    newUser.save()
    .then((savedUser) => {

        //send back the created Message
        res.json(savedUser);
            
    }, (err) => {
        res.status(400).json(err)
    });
}

function login(req, res) {

    let user = require("../models/users");
    
    user.findOne({name : req.body.name, password:req.body.password})
    .then((getuser) => {
        console.log(getuser)
        res.status(200).json(getuser);
        redirect("/user/"+user._id);
    }, (err) => {
        res.status(500).json(getuser);
    });
 }


module.exports.login = login;
module.exports.signin = signin;

