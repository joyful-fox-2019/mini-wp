const jwt = require('../helpers/jwt');
const Article = require('../models/article');

function authentication(req, res, next) {
    console.log(req.headers)
    try {
        let decoded = jwt.verifyToken(req.headers.token);
        req.decoded = decoded;
        next()
    } catch (err) {
        next(err);
    }
};

function authorization(req, res, next) {
    console.log(req.params.id)
    console.log('decoded =>>>>', req.decoded.id)
    Article.findById(req.params.id)
        .then(article => {
            if (article) {
                if (article.author == req.decoded.id) {
                    next()
                } else {
                    res.status(401).json({
                        message: 'Unauthorized user'
                    })
                }
            } else {
                res.status(404).json({
                    message: 'article is not found!'
                })
            }
        })
        .catch(next);
};

module.exports = {
    authentication,
    authorization
}