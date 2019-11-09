const router = require('express').Router()
const upload = require('../helpers/gcsUpload')
const ArticleController = require('../controllers/ArticlesController')
const {  authorization } = require('../middleware/auth')

router.post('/', upload.single('file'), ArticleController.create)
router.get('/search', ArticleController.search)
router.get('/:id', authorization, ArticleController.findById)
router.get('/', ArticleController.find)
router.patch('/:id', authorization, upload.single('file'), ArticleController.update)
router.delete('/:id', authorization, ArticleController.delete)

module.exports = router