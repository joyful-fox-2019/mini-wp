const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = {
  sign (payload) {
    return jwt.sign(payload, secret)
  },
  verify (token) {
    return jwt.verify(token, secret)
  }
}