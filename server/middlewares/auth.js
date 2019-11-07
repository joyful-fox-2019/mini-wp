const { verify } = require('../helpers/jwt')
const Article = require('../models/article')

module.exports = {
  authenticate (req, res, next) {
    try {
      const decode = verify(req.headers.token)
      req.loggedUser = decode
      next()
    }
    catch (err) {
      next(err)
    }
  },
  authorize (req, res, next) {
    const { id } = req.params
    Article.findById(id)
      .then(article => {
        if(article && article.owner.toString === req.loggedUser.id){
          next()
        } else {
          next({ status: 403, message: 'Authorization failed'})
        }
      })
      .catch(next)
  }

}