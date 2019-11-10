const User = require('../models/user')
const generateToken = require('../helpers/generateToken')
const verifyPassword = require('../helpers/verifyPassword')
const {OAuth2Client} = require('google-auth-library');

class userController {
    static getUsersToFollow(req, res, next) {
        let usersToFollow = []
        let users_data = []

        User.find()
            .then(users => {
                for (let i = 0; i < users.length; i++) {
                    if (users[i]._id != req.LoggedUser.id) {
                        users_data.push(users[i])
                    }
                }
                return User.findById(req.LoggedUser.id)
                    .then(user => {
                        for (let i = 0; i < users_data.length; i++) {
                            if (user.following.indexOf(users_data[i]._id) == -1) {
                                usersToFollow.push({
                                    id: users_data[i]._id,
                                    name: users_data[i].name
                                })
                            }                        
                        }
                        res.status(200).json(usersToFollow)
                    })
                    .catch(next)
            })
            .catch(next)
    }
    
    static register(req, res, next) {
        const registeredData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(registeredData)
            .then(user => {
                const userData = {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
                const token = generateToken(userData)

                res.status(201).json({
                    userData, token, msg: 'Successfully registered'
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        const email = {
            email: req.body.email
        }

        User.findOne(email)
            .then(user => {
                const passwordIsTrue = verifyPassword(req.body.password, user.password)

                if (passwordIsTrue) {
                    const userData = {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }

                    const token = generateToken(userData)

                    res.status(200).json({
                        userData, token, msg: 'Successfully Logged-in'
                    })
                } else {
                    throw {
                        status: 401,
                        msg: 'Wrong email/password'
                    }
                }
            })
            .catch(next)
    }

    static getFollowing(req, res, next) {
        const id = req.LoggedUser.id
        User.findById(id).populate('following')
            .then(users => {
                res.status(200).json(users.following)
            })
            .catch(next)
    }

    static getFollowers(req, res, next) {
        const id = req.LoggedUser.id
        User.findById(id).populate('followers')
            .then(users => {
                res.status(200).json(users.followers)
            })
            .catch(next)
    }

    static follow (req, res, next) {
        const from = req.LoggedUser.id
        const to = req.params.id

        User.findByIdAndUpdate(from, {
            $push: {
                following: to
            }
        })
            .then(user => {
                return User.findByIdAndUpdate(to, {
                    $push: {
                        followers: from
                    }
                })
                    .then(user => {
                        res.status(200).json({
                            msg: 'Successfully following'
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }

    static unfollow(req, res, next) {
        const from = req.LoggedUser.id
        const to = req.params.id

        User.findByIdAndUpdate(from, {
            $pull: {
                following: to
            }
        })
            .then(user => {
                return User.findByIdAndUpdate(to, {
                    $pull: {
                        followers: from
                    }
                })
                    .then(user => {
                        res.status(200).json({
                            msg: 'Successfully unfollowing'
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLECLIENTID);
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLECLIENTID
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                return User.findOne({
                    email: payload.email
                })
                    .then(data => {
                        payload.id = data._id
                        const token = generateToken(payload)
                        res.status(200).json({token})
                    })
            })
            .catch(next)

    }

}

module.exports = userController