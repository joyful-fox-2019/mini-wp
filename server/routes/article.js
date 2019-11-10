const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const { authentication, authorization } = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')

router.use(authentication)
router.post('/', multer.single('featured_image'), gcs, ArticleController.create)
router.get('/', ArticleController.readAll)
router.get('/:id', ArticleController.readOne)

router.use('/:id', authorization)
router.put('/:id', ArticleController.updateField)
router.delete('/:id', ArticleController.deleteArticle)

module.exports = router