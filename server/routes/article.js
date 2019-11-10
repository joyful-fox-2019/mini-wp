const router = require('express').Router();
const ArticleController = require('../controllers/article');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get('/', authenticate, ArticleController.getAll);
router.get('/:id', authenticate, ArticleController.show);
router.post('/', authenticate, ArticleController.create);
router.put('/:id', authenticate, ArticleController.update);
router.delete('/:id', authenticate, authorize, ArticleController.destroy);

module.exports = router;