const router = require('express').Router()
const ArticleController = require('../controllers/articleController')
const { authorization,authentication } = require('../middleware/auth')

router.get('/', ArticleController.allArticle)
router.get('/:id', ArticleController.findArticle)

router.use(authentication)
router.post('/', ArticleController.createArticle)
router.patch('/:id', authorization, ArticleController.updateArticle)
router.patch('/:id/img', authorization, ArticleController.updateImage)
router.delete('/:id', authorization, ArticleController.deleteArticleAndImageUrl)

module.exports = router