const router = require('express').Router()
const userRoute = require('./user')
const articleRoute = require('./article')

router.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to wordride'})
})

router.use('/users', userRoute)
router.use('/articles', articleRoute)


module.exports = router