const router = require('express').Router()
const articleRoute = require('./article')

router.use('/article', articleRoute)

module.exports = router