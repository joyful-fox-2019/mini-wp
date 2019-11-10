`use strict`
const router = require('express').Router()
const userRouter = require('./userRouter')
const articleRouter = require('./articleRouter')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage});


router.use('/',userRouter)
router.use('/articles', articleRouter)


module.exports = router