const users = require('express').Router();
const { UserController } = require('../controllers');
const { authenticate } = require('../middlewares/auth');

users.post('/signin', UserController.signIn);
users.post('/signup', UserController.signUp);
users.post('/google-sign', UserController.googleSign);
users.get('/status', authenticate, UserController.getStatus);

module.exports = users;
