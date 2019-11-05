const router = require('express').Router()

const ArticleController = require('../controllers/ArticleController')
const images = require('../helpers/images')
const {authentication, authorization} = require('../middlewares/auth')

router.use(authentication)
router.get('/',ArticleController.readPrivate)
router.get('/public',ArticleController.readPublic)
// router.post('/',ArticleController.create)
router.post('/',images.multer.single('image'),images.sendUploadToGCS,ArticleController.create)

router.put('/:id',authorization,images.multer.single('image'),images.sendUploadToGCS,ArticleController.update)
router.delete('/:id',authorization,ArticleController.delete)
// router.post('/upload',
//   images.multer.single('image'), 
//   images.sendUploadToGCS,
//   (req, res) => {
//     res.send({
//       status: 200,
//       message: 'Your file is successfully uploaded',
//       link: req.file.cloudStoragePublicUrl
//     })
//   })

module.exports = router