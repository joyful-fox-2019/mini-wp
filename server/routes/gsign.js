const router = require('express').Router()
const verify = require('../middlewares/verifyGoogle')
const userController = require('../controllers/userController')

router.post('/', verify, userController.gsign)

module.exports = router