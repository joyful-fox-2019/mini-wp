const router = require('express').Router()
const userRoutes = require('./userRoutes')
const postRoutes = require('./postRoutes')
const imageRoutes = require('./imageRoutes')
const tagsRoutes = require('./tagsRoutes')

router.use('/', userRoutes)
router.use('/posts', postRoutes)
router.use('/img', imageRoutes)
router.use('/tags', tagsRoutes)

module.exports = router