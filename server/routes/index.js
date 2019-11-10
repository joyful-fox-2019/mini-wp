const router = require('express').Router()
const articleRouter = require('./article')
const userRouter = require('./user')

router.use('/article', articleRouter)

router.use('/', userRouter)

module.exports = router