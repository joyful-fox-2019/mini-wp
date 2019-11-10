const { verifyToken } = require('../helpers/jwt')
const Article = require('../models/article')

const authentication = (req, res, next) => {
  try {
      req.loggedUser = verifyToken(req.headers.token) //option expire
      console.log(req.loggedUser);
      next()
  } catch (err) {
    next(err)
  }
}

const authorization = (req, res, next) => {
  let { id } = req.params //id article
  console.log(req.params);
  
  Article.findById(id)
  .then(article => {
    if (!article) {
      next({status : 404, message : `to-do not found`})
    } else if (article.userId == req.loggedUser.id) {
      
      next()
    } else {
      console.log(typeof article.userId, article.userId);
      console.log(typeof req.loggedUser.id, req.loggedUser.id);
      
      next({ status : 403, message : `not authorized`})
    }
  })
}

module.exports = {
  authentication,
  authorization
}