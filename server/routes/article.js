const router = require('express').Router()
const ArticleController = require('../controllers/article')
const { authenticate, authorize} = require('../middlewares/auth')

const gcsUpload = require('../middlewares/gcs')

const upload = gcsUpload({
  limits: {
    fileSize: 2e6
  },
  gcsConfig: {
    keyFilename: process.env.KEYFILE_PATH,
    bucketName: process.env.BUCKET_NAME
  }
})

router.use(authenticate)
router.get('/', ArticleController.find)
router.post('/', upload.single('image'), ArticleController.create)
router.get('/:id', authorize, ArticleController.findById)
router.patch('/:id', authorize ,upload.single('image'), ArticleController.update)
router.delete('/:id', authorize, ArticleController.remove)

module.exports = router
