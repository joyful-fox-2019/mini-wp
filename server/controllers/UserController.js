const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
const { compare } = require('../helpers/hash')
const { OAuth2Client } = require('google-auth-library')
const clientId = process.env.CLIENT_ID
const client = new OAuth2Client(clientId)

class UserController {

    static register(req, res, next){
       
        const { email, password } = req.body
        User.create({ email, password })
            .then(user =>{
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next){
        const { email, password } = req.body
        User.findOne({ email })
            .then(user =>{
                if(user && compare(password, user.password)){
                    let payload = {
                        id: user._id
                    }
                    let token = generateToken(payload)
                    res.status(200).json({token})
                }
                else {
                    next({
                        status: 400,
                        msg: 'email or password is wrong'
                    })
                }
            })
    }


    static googleLogin(req, res, next) {
        const { id_token } = req.body
        let payload
        client.verifyIdToken({
            idToken: id_token,
            audience: clientId
        })
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({ email: payload.email })
            })
            .then(user => {
                if (user) {
                    console.log(`user already registered`)
                    return user
                } else {
                    console.log(`user not registered`)

                    return User.create({
                        email: payload.email,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(user => {
                const token = generateToken({
                    userId: user._id,
                    email: payload.email
                })

                res.status(200).json({ token })
            })
            .catch(next)
    }

    static update(req, res, next){
        const { firstName, lastName, address, file } = req.body
        const { id } = req.decode
        User.findByIdAndUpdate(id, { firstName, lastName, address, profilePic: file }, { omitUndefined: true })
            .then(user =>{
                res.status(200).json(user)
            })
            .catch(next)
    }

    
}

module.exports = UserController