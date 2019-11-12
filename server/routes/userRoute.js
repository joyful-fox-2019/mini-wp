const router = require('express').Router()
const UserController = require('../controllers/user')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.post('/subscribe', UserController.subscribe)

module.exports = router