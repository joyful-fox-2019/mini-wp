const router = require('express').Router()
const userController = require('../controllers/user')

router.post('/login', userController.login)

router.post('/register', userController.register)

router.post('/google', userController.glogin)

module.exports = router