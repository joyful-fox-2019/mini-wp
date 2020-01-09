const router = require('express').Router()
const articleController = require('../controllers/article')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const images = require('../helpers/images')

router.use(authentication)

// get all article published by everyone (authenticate)
router.get('/', articleController.getAll)

// get all my article (authenticate)
router.get('/user', articleController.getMine)

// create my article (authenticate) **default draft**
router.post('/user', images.multer.single('image'), images.sendUploadToGCS,
    articleController.createArticle)

// update my article (authenticate,authorize)
router.put('/user/:id', images.multer.single('image'), images.sendUploadToGCS, authorization, articleController.updateArticle)

// delete my article (authenticate,authorize)
router.delete('/user/:id', authorization, articleController.deleteArticle)


module.exports = router