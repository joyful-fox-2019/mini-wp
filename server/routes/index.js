const router = require('express').Router()
const article = require('./articleRoute')
const user = require('./userRoute')

router.use('/articles', article)
router.use('/', user)


module.exports = router
