const router = require('express').Router()
const ArticleController = require('../controllers/article')
const upload = require('../middlewares/upload')
const { authentication } = require('../middlewares/auth')

router.get('/', ArticleController.find)
router.use(authentication)
router.post('/', upload.single('file'), ArticleController.add)

module.exports = router