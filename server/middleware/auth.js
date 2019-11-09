const { verify } = require('../helpers/jwt')
const Article = require('../models/Article')

module.exports = {
    authentication(req, res, next) {
        const { token } = req.headers
        try {
            req.decode = verify(token)
            next()
        } catch (err) {
            next({
                status: 403,
                msg: `Please login first`
            })
        }
    },

    authorization(req, res, next) {
        const { id } = req.params
        const userId = req.decode.id
        Article.findById(id)
            .then(article => {
                if (article) {
                    if (article.userId + '' == userId) {
                        next()
                    }
                    else next(
                        {
                            status: 401,
                            msg: `You are not authorized`
                        })
                } else next({
                    status: 404,
                    msg: `article is not found`
                })
            })
            .catch(next)
    }
}