const route = require('express').Router();
const ArticleController = require('../controllers/ArticleController.js');

route.get('/', ArticleController.create);

module.exports = route;