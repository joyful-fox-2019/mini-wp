const router = require('express').Router()
const routeUsers = require('./routeUsers')
const routeArticles = require('./routeArticles')

router.get('/', (req, res) => {
  res.status(200).json('INI HOME')
})

router.use('/users', routeUsers)
router.use('/articles', routeArticles)

module.exports = router