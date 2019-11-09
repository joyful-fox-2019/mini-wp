const router = require('express').Router()
const ArticleController = require('../controllers/article')
const upload = require('../middlewares/upload')

router.get('/', ArticleController.find)
router.post('/', upload.single('file'), ArticleController.add)

module.exports = router