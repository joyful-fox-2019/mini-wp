const route = require('express').Router();
const UserController = require('../controllers/UserController.js');

route.get('/', UserController.create);

module.exports = route;