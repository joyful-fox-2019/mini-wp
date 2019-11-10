const router = require('express').Router()
const userRoute = require('./userRoute')
const articeRoute = require('./articleRoute')

router.use('/users', userRoute)
router.use('/articles', articeRoute)

module.exports = router