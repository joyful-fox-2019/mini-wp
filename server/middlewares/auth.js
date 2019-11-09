const {verifyToken} = require('../helpers/jwt')
const User = require('../models/user')

function authentication (req, res, next){
    try{
        req.loggedUser = verifyToken(req.headers.token) 
        next()
    }catch{
        next({
            status : 401,
            message : 'not Login'
        })
    }
}

function authorization (req, res, next){
    let articleId = req.params.id

    User.findOne({articlesId : articleId})
    .then(data=>{
        if(data._id == req.loggedUser.id){
            next()
        }else{
            next({
                status : 403,
                message : 'Not Authorized'
            })
        }
        
    })
    .catch(next)
}

module.exports = {authentication, authorization}