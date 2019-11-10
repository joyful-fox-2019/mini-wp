const Post = require('../models/post')

function isAuthorized(req, res, next) {
    if(req.LoggedUser) {
        try {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.user == req.LoggedUser.id) {
                        next()
                    } else {
                        res.status(401).json({
                            msg: 'Validation Error, Users exclusive feature'
                        })
                    }
                })
                .catch(next)
        } catch {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({
            msg: 'Token not found'
        })
    }
}

module.exports = isAuthorized