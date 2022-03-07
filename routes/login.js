//Access the router on Express 
const router = require('express').Router();

const { render } = require('express/lib/response');
//Access the controllers
const controller = require('../controllers/login');

//CREATE
router.post("/login", (req, res) => {

    controller.login(req, res);
    

});

//READ
router.post("/signin", (req, res) => {
    
    controller.signin(req, res);

});

module.exports = router;