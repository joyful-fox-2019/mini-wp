const router = require('express').Router()
const ArticleController = require('../controllers/article')
const upload = require('../middlewares/upload')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', ArticleController.find)
router.get('/:id', ArticleController.findOne)
router.use(authentication)
router.post('/', upload.single('file'), ArticleController.add)
router.use('/:id', authorization)
router.patch('/:id', upload.single('file'), ArticleController.update)
router.delete('/:id', ArticleController.delete)

module.exports = router