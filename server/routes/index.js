const router = require('express').Router()
const articleRouter = require('./article')

router.use('/article', articleRouter)

module.exports = router