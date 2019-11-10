const router = require('express').Router()
const loginRouter = require('./login')
const registerRouter = require('./register')
const articleRouter = require('./article')
const userRouter = require('./user')
const gsignRouter = require('./gsign')


router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/articles', articleRouter)
router.use('/users', userRouter)
router.use('/gsign', gsignRouter)

module.exports = router