const router = require('express').Router()
const userController = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

router.get('/', isLogin, userController.getUsersToFollow)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/gsignin', userController.googleLogin)
router.get('/following', isLogin, userController.getFollowing)
router.get('/followers', isLogin, userController.getFollowers)
router.patch('/follow/:id', isLogin, userController.follow)
router.patch('/unfollow/:id', isLogin, userController.unfollow)

module.exports = router
