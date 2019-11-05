const User = require('../models/User')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {
    static register (req, res, next) {
        let { name, email, password } = req.body
        User.create({
            name,
            email,
            password
        })
        .then (result => {
            res.status(201).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static login (req, res, next) {
        let { email, password } = req.body
        User.findOne({
            email
        })
        .then (result => {
            if (compare(password, result.password)) {
                let token = generateToken({
                    _id: result._id,
                    name: result.name
                })
                res.status(200).json({ token })
            } else {
                let err
                err = new Error('Wrong Password')
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    }

    static googleLogin (req, res, next) { 
        let payload
        let token
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then (ticket => {
            payload = ticket.getPayload()
            return User.findOne({
                email: payload.email
            })
        })
        .then (result => {
            if (result) {
                token = generateToken({
                    _id: result._id,
                    name: result.name
                })
                res.status(200).json({token})
            } else {
                return User.create({
                    email: payload.email,
                    name: payload.name,
                    password: payload.name
                })
            }
        })
        .then (result => {
            token = generateToken({
                _id: result._id,
                name: result.name
            })
            res.status(200).json({token})
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = UserController