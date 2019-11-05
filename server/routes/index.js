const router = require('express').Router()
const usersRouter = require('./users')
const articlesRouter = require('./articles')
const { authentication } = require('../middlewares/auth')

router.get('/', (req, res, next) => {
  res.status(200).json({ welcome: 'spotlight' })
})

router.use('/users', usersRouter)
router.use(authentication)
router.use('/articles', articlesRouter)

module.exports = router