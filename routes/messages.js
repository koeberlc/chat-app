//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/messages');

//READ
router.get("/user/:id/:id2/", (req, res) => {
    controller.reads(req, res);
});

router.get("/user/:id", (req, res) => {
    controller.readUsers(req, res);
    controller.reads(req, res);
});


module.exports = router;