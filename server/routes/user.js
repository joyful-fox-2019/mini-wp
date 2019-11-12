const routes = require('express').Router()
const UserController = require('../controllers/user')
const verify = require('../middlewares/verify')
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

routes.get('/', UserController.findAll)
routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.delete('/:id', UserController.delete)
routes.post('/google',verify,UserController.googleLogin)

module.exports = routes