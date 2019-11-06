const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const {compare } = require('../helpers/passwordHandler')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

class UserController {

  static register(req, res, next) {
    User.create({
      email : req.body.email,
      password : req.body.password
    })
    .then(user => {
      req.status(201).json(user)
    })
    .catch(next)
  }

  static login(req, res, next) {
    User.findOne({
      email : req.body.email
    })
    .then(user => {
      if(!user) {
        throw {status : 404, message : `you have to register first`}
      } else {
        let password = req.body.password
        let passwordDB = user.password
        let match = compare(password, passwordDB)
        if (match) {
          let token = generateToken({
            id : user._id,
            email : user.email
          })
          res.status(200).json({ token })
        } else {
          throw {status : 400, message : `username/password wrong`}
        }
      }
    })
  }

}

module.exports = UserController