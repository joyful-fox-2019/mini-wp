const router = require('express').Router()
const ArticleController = require('../controllers/article')

router.get('/', ArticleController.find)
router.post('/', ArticleController.add)
router.patch('/', ArticleController.update)

module.exports = router