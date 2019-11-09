const User = require('../models/user');
const password = require('../helpers/password');
const jwt = require('../helpers/jwt');
const sendEmail = require('../helpers/sendEmail')

class UserController {
    static register(req,res,next){
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(user){
                throw new Error("Email already register")
            }else{
                return User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })
            }
        })
        .then(user => {
            sendEmail(user);
            res.status(201).json(user);
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req,res,next){
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(!user){
                throw new Error("your email is not registered")
            }else{
                let valid = password.compare(req.body.password, user.password);
                if(valid){
                    let token = jwt.generateToken({id: user._id});
                    res.status(200).json({
                        token,
                        name: user.username
                    })
                }else{
                    throw new Error("your password is incorrect")
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController;