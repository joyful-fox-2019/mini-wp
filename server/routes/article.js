const routes = require('express').Router()
const ArticleController = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: "keyfile.json",
        bucketName: "mini-wp-image-anggabanny"
    }
})

routes.use(authentication)
routes.get('/', ArticleController.findAll)
routes.post('/', upload.single('imageUrl'), ArticleController.create)
routes.patch('/:id', authorization, ArticleController.updatePatch)
routes.put('/:id', authorization, ArticleController.updatePut)
routes.delete('/:id', authorization, ArticleController.delete)

module.exports = routes