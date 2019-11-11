const router = require('express').Router()
const ArticleController = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')

router.get('/', ArticleController.findAll)
router.use(authentication)
router.post('/', multer.single('featured_image'), gcs, ArticleController.addArticle)
router.delete('/:id', authorization, ArticleController.delete)
router.patch('/:id', authorization, multer.single('featured_image'), gcs, ArticleController.updateField)

module.exports = router