const router = require("express").Router()
const userController = require('../controllers/userController')
const images = require("../middlewares/images")
const {authentication} = require('../middlewares/auth')

router.get('/', authentication , userController.ownArticles)
router.get('/search?', authentication , userController.searchOwnArticles)
router.post('/', authentication, images.multer.single('image'), 
images.sendUploadToGCS, userController.upload)

module.exports = router