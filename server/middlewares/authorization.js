const Article = require('../models/article')

module.exports = (req, res, next) => {
    Article.findById(req.params.id)
        .then(article => {
            if (article && article.author == req.decoded._id) {
                next()
            } else {
                // article not found
                throw 'ANF'
            }

        })
        .catch(next)
}