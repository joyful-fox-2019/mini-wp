`use strict`
const articleController = require('../controllers/articleController')
const router = require('express').Router()
const {authenticate, authorize} = require('../middlewares/auth')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({    
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: './google-credential.json',
      bucketName: 'royhan-mardista-image'
    }
})

router.use(authenticate)
router.get('/', articleController.findAll)
router.post('/', upload.single('featuredImage'), articleController.add)
router.get('/:id', articleController.findOne)
router.delete('/:id',authenticate, authorize, articleController.delete)
router.put('/:id', authenticate, authorize, articleController.update)

module.exports = router