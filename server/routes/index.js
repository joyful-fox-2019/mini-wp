const router = require('express').Router()
const usersRouter = require('./users')

router.get('/', (req, res, next) => {
  res.status(200).json({ welcome: 'spotlight' })
})

router.use('/users', usersRouter)

module.exports = router