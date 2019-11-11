const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', function(req, res, next){
    res.status(200).json("User Route invoked")
})

router.post('/login',UserController.login)
router.post('/signIn',UserController.signIn)
router.post('/register', UserController.create)

module.exports = router
