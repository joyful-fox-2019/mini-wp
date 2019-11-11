const router = require('express').Router()
const UserRouter = require('./UserRouter')
const ArticleRouter = require('./ArticleRouter')

router.use('/', UserRouter)
router.use('/article', ArticleRouter)

module.exports = router