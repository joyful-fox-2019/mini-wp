const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const {authentication, authorizationArticle} = require('../middlewares/auth')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
    bucketName: process.env.CLOUD_BUCKET
  }
})

router.use(authentication)

router.post('/',  upload.array('imgUrl'), ArticleController.create)
router.get('/', ArticleController.readAll)
router.get('/personal', ArticleController.readPersonal)

router.use('/:id', authorizationArticle)

router.get('/:id', ArticleController.readById)
router.put('/:id', upload.array('imgUrl'), ArticleController.update)
router.delete('/:id', ArticleController.delete)


module.exports = router