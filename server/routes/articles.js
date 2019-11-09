const router = require('express').Router()
const ArticleController = require('../controllers/article')

router.get('/', ArticleController.find)
router.post('/', ArticleController.add)

module.exports = router