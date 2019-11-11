const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const authentication = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')
const upload = require('../middlewares/GCSUpload')

router.post('/upload', upload.single('file'), (req, res, next) => {
    try {
        res.status(200).json(req.body)
    } catch (err) {
        console.log(err)
        next(err)
    }
})
router.get('/news', ArticleController.findAllArticles)
router.use(authentication)
router.get('/', ArticleController.findAll)
router.post('/', ArticleController.create)
router.patch('/:id', authorization, ArticleController.updateOne)
router.delete('/:id', authorization, ArticleController.delete)
router.get('/:id', authorization, ArticleController.findOne)
router.get('/search/:title', ArticleController.searchArticle)
router.get('/tags/:tag', ArticleController.searchTag)
router.patch('/like/:id', ArticleController.likeArticle)
router.patch('/comment/:id', ArticleController.commentArticle)

module.exports = router