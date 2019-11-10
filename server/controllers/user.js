const User = require('../models/user')
const {
    compare
} = require('../helpers/bcrypt')
const {
    getToken
} = require('../helpers/jsonwebtoken')

class UserController {
    static login(req, res, next) {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {
                    //user not found
                    throw 'UNF'
                } else {
                    let valid = compare(req.body.password, user.password)
                    if (valid) {
                        let payload = {
                            name: user.full_name,
                            _id: user._id
                        }
                        let token = getToken(payload)
                        res.status(200).json({
                            token
                        })
                    } else {
                        //wrong password/username
                        throw 'WRONG'
                    }
                }
            })
            .catch(next)
    }

    static register(req, res, next) {
        let {
            email,
            password
        } = req.body
        User.create({
                email,
                password
            })
            .then(user => {
                res.status(201).json({
                    user
                })
            })
            .catch(next)
    }

    static glogin(req, res, next) {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        email: req.body.email,
                        password: process.env.PASSWORD_DEFAULT
                    })
                }
            })
            .then(user => {
                let payload = {
                    _id: user._id
                }
                let token = getToken(payload)
                res.status(200).json({
                    token
                })
            })
            .catch(next)
    }
}

module.exports = UserController