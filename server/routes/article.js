const router = require('express').Router()
const ArticleController = require('../controllers/article')
const { authentication, authorization } = require('../middleware/auth')
// const multer = require('../middleware/multer')
// const gcs = require('../middleware/gcs')
const upload = require('../middleware/upload')
const singleUpload = upload.single('image')

router.get('/', ArticleController.findAll)

router.use(authentication)
router.post('/', singleUpload, ArticleController.create)
router.get('/search', ArticleController.findByTag)
router.get('/user', ArticleController.myPost)
router.get('/:id', ArticleController.findOne)
router.get('/quotes', ArticleController.getQuote)

router.use('/:id', authorization)
router.patch('/:id/update', singleUpload, ArticleController.update)
router.delete('/:id/delete', ArticleController.delete)


module.exports = router