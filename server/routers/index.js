const router = require('express').Router()
const userRouter = require('../routers/userRouter')
const articleRouter = require('../routers/articleRouter')

router.get('/',(req,res) => {
  res.status(200).json({ message:"Connected" })
})

router.use('/users', userRouter)
router.use('/articles', articleRouter)

module.exports = router