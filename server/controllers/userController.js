const User = require('../models/User')
const {PasswordHasher,VerifyPassword} = require('../helpers/passwordGenerator')
const {generateToken,VerifyToken} = require('../helpers/tokenGenerator')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLINT_ID);


class UserController {
    static findAll(req,res,next){
        User.find()
        .then(users => {
            res.status(200).json(users)
        })
    }

    static register(req,res,next){
        console.log(req.body)
        User.create({
            fullname: req.body.fullname,
            email:req.body.email,
            password : PasswordHasher(req.body.password)
        })
        .then(user => {
            console.log(user,'dari userr')
            res.status(200).json({token,fullname:user.fullname})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
            // next({
            //     status : 400,
            //     message : err.message
            // })
        })
    }

    static login(req,res,next){
        // res.status(200).json('halo')
        User.findOne({
            email : req.body.email
        })
        .then(user => {
            
            if(user){
                
                if(VerifyPassword(req.body.password,user.password)){
                    let payloads = {
                        _id : user.id,
                        fullname : user.fullname,
                        email : user.email
                    }
                    let token = generateToken(payloads)
                    res.status(200).json({token,fullname:user.fullname})
                    
                }else{
                    next({
                        status : 400,
                        message : 'wrong username/password'
                    })
                }
            }else{
                next({
                    status : 400,
                    message : 'email not found'
                })
            }
        })
        .catch(err => {
            next({
                status : 400,
                message : err.message
            })
        })
    }

    static googleLogin(req,res,next){
        let id_token = req.body.id_token
        let payloadJWT
        let Email
        let Fullname
        let password = 'qwerty'
        
        client.verifyIdToken({
            idToken :id_token,
            audience : process.env.CLIENT_ID
        })
        .then(ticket =>{
            const payloads = ticket.getPayload()
            Email = payloads.email
            Fullname = payloads.email.split('@')[0]

            return User.findOne({email:Email})
        })
        .then(user => {
            if(user){
                payloadJWT = {
                    _id : user.id,
                    fullname : user.fullname,
                    email : user.email
                }
                let token = generateToken(payloadJWT)
                
                res.status(200).json(token)
            }else{
                User.create({
                    fullname: Fullname,
                    email: Email,
                    password : password
                })
                .then(newUser => {
                    payloadJWT = {
                        _id : newUser.id,
                        fullname : newUser.fullname,
                        email : newUser.email
                    }
                    let token = generateToken(payloadJWT)
                    res.status(200).json(token)
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController