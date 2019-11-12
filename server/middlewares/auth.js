const {verifyToken} = require('../helpers/jwt')
const User = require('../models/user')
const Article = require('../models/article')

function authentication(req, res, next){
    try {
        let decodedToken = verifyToken(req.headers.token)
        User.findById(decodedToken._id)
            .then(user => {
                if(user){
                    req.loggedUser = decodedToken
                    next()
                }
                else{
                    next({
                        status: 401,
                        message: 'Authentication Failed'
                    })
                }
            })
            .catch(next)
    }
    catch(err) {
        next({ 
            status: 401,
            message: err 
        })
    }
}

function authorizationArticle(req, res, next){
    Article.findById(req.params.id)
        .then(article => {
            if(!article){
                next({ status: 404, message: 'Not Found' })
            }
            else if(article.author == req.loggedUser._id){
                next()
            }
            else{
                next({ 
                    status: 403, 
                    message: 'Not Authorized' 
                })
            }
        })
        .catch(next)
}

module.exports = {authentication, authorizationArticle}