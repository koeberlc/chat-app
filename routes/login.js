//Access the router on Express 
const router = require('express').Router();
const path = require('path');
const { render } = require('express/lib/response');
//Access the controllers
const controller = require('../controllers/login');

//CREATE
router.post("/login", (req, res) => {
    controller.login(req, res);
});

router.post("/signin", (req, res) => {
    controller.signin(req, res);
});

//CREATE
router.get("/login", (req, res) => {
    let reqPath = path.join(__dirname, '../')
    res.sendFile(reqPath + '/views/login.html');
});

router.get("/signin", (req, res) => {
    let reqPath = path.join(__dirname, '../')
    res.sendFile(reqPath + '/views/signin.html');
});

module.exports = router;