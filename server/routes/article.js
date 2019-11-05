const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', ArticleController.create)
router.get('/', ArticleController.readAll)
router.get('/:id', ArticleController.readOne)

router.use('/:id', authorization)
router.put('/:id', ArticleController.updateField)
router.delete('/:id', ArticleController.deleteArticle)

module.exports = router