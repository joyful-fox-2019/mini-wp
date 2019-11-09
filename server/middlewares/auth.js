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
    const { mode } = req.query
    Article.findById(id).populate('owner')
      .then(article => {
        if( mode === 'read') {
          next()
        } else {
          if(article && article.owner._id.toString() === req.loggedUser.id){
            next()
          } else {
            next({ status: 403, message: 'Authorization failed'})
          }
        }
      })
      .catch(next)
  }

}