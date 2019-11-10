const router = require('express').Router()
const userRoute = require('./userRoute')
const articleRoute = require('./articleRoute')
const {authentication} = require('../middlewares/authentication')

router.use('/users', userRoute)

router.use('/articles', articleRoute)

module.exports = router