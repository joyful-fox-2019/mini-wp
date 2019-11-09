const articles = require('express').Router();
const { ArticleController } = require('../controllers');
const { authenticate, authorize } = require('../middlewares/auth');

articles.use(authenticate);
articles.post('/', ArticleController.postArticle);
articles.get('/user', ArticleController.getUserArticles);

module.exports = articles;
