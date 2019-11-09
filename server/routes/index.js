const router = require('express').Router()
const userRoute = require('./userRoute')
const articeRoute = require('./articleRoute')
const { authentication } = require('../middleware/auth')

router.use('/users', userRoute)
router.use('/articles', authentication, articeRoute)

module.exports = router