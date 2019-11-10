const router = require('express').Router()
const upload = require('../helpers/gcsUpload')
const ArticleController = require('../controllers/ArticlesController')
const { authentication, authorization } = require('../middleware/auth')

router.get('/all', ArticleController.findAll)
router.get('/top', ArticleController.findTop)
router.post('/', authentication, upload.single('file'), ArticleController.create)
router.get('/search', authentication, ArticleController.search)
router.get('/:id', authentication, authorization, ArticleController.findById)
router.get('/', authentication, ArticleController.find)
router.patch('/:id', authentication, authorization, upload.single('file'), ArticleController.update)
router.delete('/:id', authentication, authorization, ArticleController.delete)
router.patch('/:id/upvote', authentication, ArticleController.upvote)
router.patch('/:id/downvote', authentication, ArticleController.downvote)
router.patch('/:id/inc', ArticleController.incrementReader)
router.get('/:id/read', ArticleController.findByIdRead)

module.exports = router