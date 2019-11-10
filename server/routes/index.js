const router = require('express').Router()
const UserController = require('../controllers/userCon')
const ArticleController = require('../controllers/articleCon')
const { authentication, authorization } = require('../middlewares/auth')
const googleVerify = require('../middlewares/googleVerify')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')


router.post('/register' , UserController.register)
router.post('/loginGoogle', googleVerify, UserController.google)
router.post('/login', UserController.login)


router.put('/updatepass', UserController.changePassword)
router.put('/updatepp', UserController.updatePP)

router.use(authentication)
router.get('/articles', ArticleController.showAll)
router.get('/articlesUser', ArticleController.showArticleUser)
router.post('/articles', multer.single('image'), gcs, ArticleController.add)
router.get('/articles/:id', authorization, ArticleController.showOne)
router.put('/articles/:id', authorization, ArticleController.update)
router.delete('/articles/:id', authorization, ArticleController.delete)

module.exports = router