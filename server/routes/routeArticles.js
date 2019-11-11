const router = require('express').Router()
const ControllerArticle = require('../controllers/article')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: './google-credential.json',
    bucketName: 'mini-wp-vue-components'
  }
})

router.post('/upload-single', authenticate, upload.single('image'), (req, res, next) => {
  try {
    res.status(200).send(req.body.image)
  }
  catch(next) {}
})

router.get('/', authenticate, ControllerArticle.fetchAll)

router.post('/', authenticate, ControllerArticle.add)

router.get('/:id', authenticate, authorize, ControllerArticle.fetchOne)

router.patch('/:id', authenticate, authorize, ControllerArticle.update)

router.delete('/:id', authenticate, authorize, ControllerArticle.delete)


module.exports = router