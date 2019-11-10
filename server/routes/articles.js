const articles = require('express').Router();
const { ArticleController } = require('../controllers');
const { authenticate, authorize } = require('../middlewares/auth');

articles.use(authenticate);
articles.post('/', ArticleController.postArticle);
articles.get('/user', ArticleController.getUserArticles);
articles.use('/:id', authorize);
articles.put('/:id', ArticleController.updateArticle);
articles.patch('/:id', ArticleController.deleteArticle);
articles.delete('/:id', ArticleController.permanentDeleteArticle);

module.exports = articles;
