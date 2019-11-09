const router = require('express').Router()

const ArticleController = require('../controllers/ArticleController')
const images = require('../helpers/images')
const {authentication, authorization} = require('../middlewares/auth')

router.use(authentication)
router.get('/public',ArticleController.readPublic)
router.get('/',ArticleController.readPrivate)
router.get('/:id',authorization,ArticleController.readPrivateDetail)
router.get('/public/:id',ArticleController.readPublicDetail)

router.post('/',images.multer.single('image'),images.sendUploadToGCS,ArticleController.create)

router.put('/:id',authorization,images.multer.single('image'),images.sendUploadToGCS,ArticleController.update)
router.delete('/:id',authorization,ArticleController.delete)
module.exports = router