const { decodeToken } = require('../helpers/jwt')
const User = require('../models/User')
const Article = require('../models/Article')

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
          .catch(next)
      }
    } catch(err) {
      next(err)
    }
  },
  authorization: (req, res, next) => {
    Article.findById(req.params.id)
      .then(article => {
        if(!article) {
          throw { status: 404, msg: 'Article not found'}
        } else {
          if(String(article.user) !== String(req.loggedUser._id)) {
            throw { status: 403, msg: 'You are not authorized to access this data'}
          } else {
            next()
          }
        }
      })
      .catch(next)
  }
}