const { decodeToken } = require('../helpers/jwt')
const User = require('../models/User')

module.exports = {
  authentication: (req, res, next) => {
    try {
      if(!req.headers.access_token) {
        throw { status: 401, msg: 'You have to login first'}
      } else {
        const { _id } = decodeToken(req.headers.access_token)
        User.findById(_id)
          .then(user => {
            if(!user) {
              throw { status: 401, msg: 'You have to login first'}
            } else {
              req.loggedUser = user
              next()
            }
          })
      }
    } catch(err) {
      next(err)
    }
  }
}