`use strict`
const User = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class userController{
    
    static register(req, res, next) {
        User.create({
            email : req.body.email,
            password : req.body.password,
            username :  req.body.username
        })
        .then( user => {
            res.json({
                msg : `${user.email} is succesfully registered`
            })
        })
        .catch(next)
    }
    
    static login(req, res, next) {
        User.findOne({ // cari user dengan email yang masuk
            email : req.body.email
        })
        .then(user => {            
            if (user) { 
                let valid = comparePassword(req.body.password, user.password) // input dicompare server
                if ( valid ) { // kalo user ditemukan di data base maka langsung di buatin tokenya                    
                    let token = generateToken(user)  
                    res.json({
                        msg : 'login succes',
                        token : token                        
                    })
                } else {                    
                    next({
                        status: 404,
                        message: 'Wrong Password'
                    })
                }
            } else {
                next({
                    name : 'DataError'
                })
            } 
        })
        .catch(err => {
            next(err)
        })
    }

    static loginGoogle(req, res, next) {        
        let { email } = req.decoded
        User.findOne({
            email : email
        })
        .then( user => {
            let password = email+'tes'
            if (!user) {
                return User.create({email, password})
            } else {
                return user
            }
        })
        .then(user => {            
            let token = generateToken(user)  
            res.json({
                status : 200,
                msg : 'you are login',
                token : token
            })                     
        })
        .catch( err => {
            console.log(err)
        }) 
                   
    }

    static loginFacebook(req, res, send) {
        req.decoded = JSON.parse(req.body.user)
        let { email } = req.decoded
        console.log(email)
        User.findOne({
            email : email
        })
        .then( user => {
            let password = email+'tes'
            if (!user) {
                return User.create({email, password})
            } else {
                return user
            }
        })
        .then(user => {            
            let token = generateToken(user)  
            res.json({
                status : 200,
                msg : 'you are login',
                token : token
            })                     
        })
        .catch( err => {
            console.log(err)
        }) 
    }
}

module.exports = userController