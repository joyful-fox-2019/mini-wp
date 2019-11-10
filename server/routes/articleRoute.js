const router = require('express').Router()
const ArticleController = require('../controllers/articleController')
const {authentication, authorization} = require('../middlewares/authentication')
const gcsUpload = require('gcs-upload')
const upload = gcsUpload({
  limits: {
    fileSize: 4e6 // in bytes
  },
  gcsConfig: {
    keyFilename: process.env.KEY_FILE_LOCATION,
    bucketName: process.env.GCS_BUCKET
  }
})

router.get('/', ArticleController.findAll)
router.get('/:id', ArticleController.findOne)
router.get('/tag/:tag', ArticleController.findWithTag)
router.get('/page/:page', ArticleController.findPagination)
router.get('/tag/:tag/page/:page', ArticleController.findWithTagPagination)
router.get('/my/:page', authentication, ArticleController.myArticlesPage)

router.post('/', authentication, upload.single('file'), ArticleController.create)
router.post('/search', authentication, ArticleController.search)

router.delete('/:id', authentication, authorization, ArticleController.deleteArticle)

router.put('/:id', authentication, authorization, ArticleController.editArticle)

module.exports = router