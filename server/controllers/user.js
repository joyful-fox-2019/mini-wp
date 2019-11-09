const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')

module.exports = {
  register: (req, res, next) => {
    console.log(req.body)
    const { firstName, lastName, email, password } = req.body
    User.create({ firstName, lastName, email, password} )
      .then(user => {
        const { _id } = user
        const access_token = generateToken({ _id, email })
        res.status(201).json({ _id, email, access_token})
      })
      .catch(next)
  },
  login: (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if(!user || !comparePassword(password, user.password)) {
          throw { status: 401, msg: 'Wrong email/password'}
        } else {
          const { _id } = user
          const access_token = generateToken({ _id, email })
          res.status(200).json({ _id, email, access_token})
        }
      })
      .catch(next)
  },
  googleSignIn: (req, res, next) => {
    const { firstName, lastName } = req.body
    User.findOne({
      email: req.googleEmail
    })
    .then(user => {
      if(!user) {
        return User.create({
          email: req.googleEmail,
          firstName,
          lastName,
          isGoogle: true
        })
      } else {
        return user
      }
    })
    .then(user => {
      const access_token = generateToken({
        _id: user._id,
        email: user.email
      })
      const _id = user._id
      const email = user.email
      const password = user.password
      res.status(200).json({ _id, email, password, access_token })
    })
    .catch(next)
  },
  find: (req, res, next) => {
    User.find()
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }
}