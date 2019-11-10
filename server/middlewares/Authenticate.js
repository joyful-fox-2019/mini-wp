const User = require('../models/user')
const jwt = require('../helpers/jwt')

function authenticate(req,res,next){
    try{
        let decoded = jwt.verifyToken(req.headers.access_token);
        User.findOne({
            _id: decoded.id
        })
        .then(user => {
            if(user){
                req.user = decoded
                next()
            }
        })
        .catch(err =>{
            next({
                status: 404,
                message: 'error'
            })
        })
    }catch(err){
        err = {
            status: 403,
            message: 'You must login first'
        }
        next(err)
    }
}

module.exports = authenticate