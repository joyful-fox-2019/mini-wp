const router = require('express').Router()
const ArticleController = require('../controllers/articleController')
const { authorization,authentication } = require('../middleware/auth')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    bucketName: 'miniwpdata' // bucket name
  }
})

router.get('/', ArticleController.allArticle)
router.get('/:_id', ArticleController.findArticle)

router.use(authentication)

router.post('/', upload.single('imgUrl'),ArticleController.createArticle)
router.patch('/:_id', authorization, upload.single('imgUrl'), ArticleController.updateArticle)
router.patch('/:_id/img', authorization, upload.single('imgUrl'), ArticleController.updateImage)
router.delete('/:_id', authorization, ArticleController.deleteArticleAndImageUrl)

module.exports = router