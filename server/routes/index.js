const routes = require('express').Router();

routes.use('/user', require('./users'));
routes.use('/articles', require('./articles'));

module.exports = routes;
