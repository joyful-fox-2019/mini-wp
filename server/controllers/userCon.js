const User = require('../models/user')
const { generateHash, compareHash } = require('../middlewares/bcrypt')
const {generateToken, verifyToken} = require('../middlewares/jwt')
const gcsDelete = require('../helpers/gcsDelete')
const mongoose = require('mongoose')
const {OAuth2Client} = require('google-auth-library');


class UserController {

        static register(req, res, next) {
            if (!req.body.password) throw { message: 'You should enter your password'}
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
                .then((newUser) => {
                    res.status(201).json({message: 'Success Register', newUser})
                }).catch(next)
        }

        static login(req, res, next) {
            console.log('masuk login');
            const { identity, password } = req.body;
            User.findOne({
                $or: [{ username: identity }, { email: identity }]
            })
                .then((user) => {
                  console.log(user)
                if (!user) throw {message: 'Email/Password is wrong'}
                let passwordInput = password
                let passwordDb = user.password
                let isPassword = compareHash(passwordInput, passwordDb)
                if (!isPassword) throw {message: 'Email/Password is wrong'}
                let payload = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
                let token = generateToken(payload)
                console.log('ini headres:', req.headers.token)
                res.status(200).json({message: 'Success Login', token, profile_img: user.profile_img, username: user.username})
                }).catch(next)
        }

        static google(req, res, next) {
          User.findOne({
            email : req.headers.email
          })
            .then((user) => {
                if (user) {
                    return user
                } else {
                    return User.create({
                    username: req.headers.name,
                    email: req.headers.email,
                    password: '12345678'
                    })
                }
            })
            .then((user) => {
                let payload = {
                    id : user._id,
                    username: user.username,
                    email: user.email
                }
                let token = generateToken(payload)
                res.status(200).json({message: 'Success Login', token, profile_img: user.profile_img, username: user.username})

            })
            .catch(next)
          }

          static updatePP(req,res,next) {
            let image_url = req.file.cloudStoragePublicUrl
            let _id = req.loggedUser.id;
            console.log('update')
            User.findById(_id)
            .then(user => {
              gcsDelete(user.profile_img)
              return User.findByIdAndUpdate(_id, {profile_img: image_url}, {new: true})
            })
            .then((user) => {
              res.status(200).json({message:'Update profile picture succes' ,user})
            })
            .catch(next)    
          }

          static changePassword (req, res, next) {
            console.log('masuk change pass')
            console.log(req.body.id)
            const _id = req.body.id
            // const _id = req.loggedUser.id;
            const oldPassword = req.body.oldPassword
            const newPassword = req.body.newPassword
            User.findById(_id)
              .then(user => {
                if(user && compareHash(oldPassword, user.password)) {
                  const hashpass = generateHash(newPassword)
                  return User.findByIdAndUpdate(_id, {password: hashpass}, {new: true})
                } else {
                  throw { status: 400, msg: 'wrong old password'}
                }
              })
              .then((user) => {
                res.status(200).json({message:'Change password succes' ,user})
              })
              .catch(next)
          }
        


}

module.exports = UserController