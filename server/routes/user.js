const router = require('express').Router()
const UserController = require('../controllers/user')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/verify', UserController.vefify)
router.post('/glogin', UserController.gLogin)

module.exports = router
