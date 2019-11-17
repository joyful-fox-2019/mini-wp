const router = require('express').Router()
const UserController = require('../controllers/userController')

router.get('/',UserController.findAll)
router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.post('/googleLogin',UserController.googleLogin)

module.exports = router