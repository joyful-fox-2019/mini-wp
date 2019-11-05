const User = require('../models/User')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
class UserController {
    static register (req,res,next) {
        console.log('masuk');
        
        let {name,email,password} = req.body
        User.create({name,email,password})
        .then(result => {
            let payload = {name:result.name,email:result.email,_id:result._id}
            let token = generateToken(payload)
            res.status(201).json({token,name:result.name,_id:result._id,email:result.email})
        })
        .catch(next)
    }
    static login (req,res,next) {
        let {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user && comparePassword(password,user.password)) {
                let payload = {name:user.name,email:user.email,_id:user._id}
                let token = generateToken(payload)
                res.status(201).json({token,name:user.name,_id:user._id,email:user.email})
            } else {
                next({status:401,msg:'invalid email/password'})
            }
        })
        .catch(next)
    }
    static googleSign(req,res,next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        let name
        let email
        client.verifyIdToken({
            idToken : req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket =>{
                name = ticket.getPayload().name
                email = ticket.getPayload().email
                return User.findOne({email})
            })
            .then(user=>{
                if (user){
                    const payload = {name:user.name,email:user.email,_id:user._id}
                    let token = generateToken(payload)
                    res.status(201).json({token,_id:user._id,name:user.name,email:user.email})
                }
                else{
                    return User.create({name,email, password:"Google123"})
                }
            })
            .then(result => {
                let payload = {name:result.name,email:result.email,_id:result._id}
                let token = generateToken(payload)
                res.status(201).json({token,_id:result._id,name:result.name,email:result.email})
            })
            .catch(next)
    }
}

module.exports = UserController