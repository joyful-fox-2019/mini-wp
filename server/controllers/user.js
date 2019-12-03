const User = require('../models/user')
const { comparePass } = require('../helpers/bcrypt')
const { sign, verify } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
  static register ( req, res, next ) {
    const { name, email, password } = req.body
    User.create({ name, email, password })
      .then(user => {
        res.status(201).json({ user, message: 'Successfully register, please login'})
      })
      .catch(next)
  } 
  static login ( req, res, next ) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if(user && comparePass(password, user.password)){
          const token = sign({ id: user._id })
          res.status(200).json({ token, message: 'welcome back!'})
        } else {
          next({ status: 400, message: 'Wrong email or password'})
        }
      })
      .catch(next)
  }
  static vefify ( req, res, next ) {
    try {
      verify(req.headers.token)
      res.status(200).json({ message: 'User is verified'})
    }
    catch (err) {
      next(err)
    }
  }
  static gLogin (req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

    const { id_token } = req.body
    let userData

    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      const gPayload = ticket.getPayload()
      const { email, name } = gPayload
      userData = { email, name }
      return User.findOne({ email })
    })
    .then(user => {
      if(user){
        const token = sign({id: user._id })
        res.status(200).json({ token })
      } else {
        userData.password = 'password123'
        return User.create(userData)
        .then(user=> {
          const token = sign({id: user._id})
          res.status(200).json({ token })
        })
      }
    })
    .catch(next)
  }
}

module.exports = UserController
