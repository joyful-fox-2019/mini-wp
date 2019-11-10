const router = require('express').Router();
const Authenticate = require('../middlewares/Authenticate');
const Authorization = require('../middlewares/Authorization');
const ArticleController = require('../controllers/article')


// create
router.post('/', Authenticate, ArticleController.createArticle);

// showAll
router.get('/', Authenticate, ArticleController.getArticles);

// get User's Article
router.get('/user', Authenticate, ArticleController.findUserArticle);

// get One Article
router.get('/user/:id', Authenticate, Authorization , ArticleController.getOneArticle);

// edit article
router.put('/:id', Authenticate, Authorization, ArticleController.editArticle);

//delete article
router.delete('/:id', Authenticate, Authorization, ArticleController.deleteArticle);

module.exports = router;