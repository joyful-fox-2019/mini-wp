const router = require('express').Router()
const UserContoroller = require('../controllers/userController')

router.post('/login', UserContoroller.login)
router.post('/googleLogin', UserContoroller.googleSignIn)
router.post('/register', UserContoroller.register)

module.exports = router