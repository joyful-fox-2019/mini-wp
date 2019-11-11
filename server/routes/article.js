const routes = require('express').Router()
const ArticleController = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: "",
        bucketName: ""
    }
})

routes.use(authentication)
routes.get('/', ArticleController.findAll)
routes.post('/', ArticleController.create)
routes.use(authorization)
routes.patch('/:id', ArticleController.updatePatch)
routes.put('/:id', ArticleController.updatePut)
routes.delete('/:id', ArticleController.delete)

module.exports = routes