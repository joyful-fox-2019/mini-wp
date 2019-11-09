const router = require('express').Router()
const articleController = require('../controllers/articleController')
const {authentication, authorization} = require('../middlewares/auth')

router.get('/', articleController.allArticles)
router.get('/page/:page', articleController.pageArticles)
router.get('/search?', articleController.search)
router.get('/:id', articleController.oneArticle)
router.post('/', authentication, articleController.create)
router.patch('/:id', authentication, authorization, articleController.update)
router.delete('/:id', authentication, authorization, articleController.delete)

module.exports=router
