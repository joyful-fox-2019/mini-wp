const route = require('express').Router();
const usersRoute = require('./usersRoute.js');
const articlesRoute = require('./articlesRoute.js');

route.use('/users', usersRoute);
route.use('/articles', articlesRoute);

module.exports = route;