const router = require('express').Router();
const UserController = require('../controllers/user');

// create user
router.post('/register', UserController.register);

//login
router.post('/login', UserController.login);

module.exports = router