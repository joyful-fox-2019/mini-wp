const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')

module.exports = {
  register: (req, res, next) => {
    const { email, password } = req.body
    User.create({ email, password} )
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
  }
}