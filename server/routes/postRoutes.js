const router = require('express').Router()
const postController = require('../controllers/postController')
const isLogin = require('../middlewares/isLogin')

router.get('/', isLogin, postController.getPersonalPosts)
router.get('/liked', isLogin, postController.getLikedPost)
router.get('/following', isLogin, postController.getFollowingPost)
router.get('/popular', postController.getPopularPosts)
router.post('/', isLogin, postController.create)
router.put('/:id', isLogin, postController.edit)
router.delete('/:id', isLogin, postController.delete)
router.patch('/like/:id', isLogin, postController.likeUnlike)

module.exports = router

