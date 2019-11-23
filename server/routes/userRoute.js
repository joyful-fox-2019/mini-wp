const express = require('express')
const users = express.Router()

const userController = require('../controllers/userController')
const googleAuth = require('../middlewares/googleAuth')

users.post('/register', userController.register)
users.post('/login', userController.login)
users.post('/googleLogin', googleAuth, userController.googleLogin)

module.exports = users