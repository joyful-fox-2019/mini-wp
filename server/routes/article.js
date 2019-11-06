const router = require('express').Router();
const ArticleController = require('../controllers/article');

router.get('/', ArticleController.getAll);
router.post('/', ArticleController.create);
router.put('/:id', ArticleController.update);
router.delete('/:id', ArticleController.destroy);

module.exports = router;