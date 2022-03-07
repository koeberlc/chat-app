//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/messages');

//CREATE
router.post("/user/:id1/:id2/message/", (req, res) => {
    controller.create(req, res);

});

//READ
router.get("/user/:id1/:id2/", (req, res) => {
    controller.reads(req, res);
});

router.get("/user/:id", (req, res) => {
    controller.readUsers(req, res);
});


module.exports = router;