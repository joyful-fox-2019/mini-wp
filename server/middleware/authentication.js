const jwt = require('jsonwebtoken');
const Secret=process.env.SECRET;
const User = require('../models/User');

function authentication(req, res, next){    
    try {
        // console.log("authentication")
        const token = req.headers.token
        const decode = jwt.verify(token, Secret)
        // console.log(decode)
        req.decode = decode
        let id = req.decode.id
        // console.log(id)

        User.findById(id)
            .then(( user ) => {
                
                if(user){
                    next();
                } else {
                    next({status:401, message : "Not authorized"})
                }
            })
            .catch(next) 
    } catch {
        next({ status:401, message : "Authentication failed" })
    }
}

module.exports = authentication

