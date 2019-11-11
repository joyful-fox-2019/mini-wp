const User = require('../models/User')
const verifyHash = require('../helpers/verifyHash')
const generateToken = require('../helpers/generateToken')

class ControllerUser {
  static register(req, res, next) {
    // console.log("ini di users/register", req.body)
    const { name, email, password } = req.body
    User
      .create({
        name, email, password
      })
      .then(user => {
        // console.log("ini di users/register2", user)
        const id = user.id
        const payload = { email, id }
        const access_token = generateToken(payload)

        res.status(201).json({
          message: 'Successfully registered!',
          access_token, user
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    // console.log("ini email di login", email);
    User
      .findOne({ email })
      .then(user => {
        console.log("ini user", user);

        if (!user) throw {
          name: 'wrongEmailOrPassword',
          errStatus: 404,
          message: 'Wrong email/password!'
        }
        else {
          // console.log("password", password, user.password);
          if (!verifyHash(password, user.password)) {
            throw {
              name: 'wrongEmailOrPassword',
              errStatus: 404,
              message: 'Wrong email/password!'
            }
          }
          else {
            const id = user.id
            const payload = { email, id }
            const access_token = generateToken(payload)

            res.status(200).json({
              message: 'Successfully logged in!',
              access_token, user
            })
          }
        }
      })
      .catch(next)
  }

  static googleSignIn(req, res, next) {
    const { googleidtoken } = req.headers
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    let payload, name, email, password, picture

    client
      .verifyIdToken({
        idToken: googleidtoken,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        // console.log("ini payload dari google sign in", payload);
        name = payload.name
        email = payload.email
        password = process.env.DEFAULT_USER_PASSWORD
        picture = payload.picture
        
        return User
          .findOne({ email })
      })
      .then(user => {
        if (!user) {
          console.log("ga ada user pas google sign in, maka create", password);
          
          User
            .create({
              name, email, password, picture
            })
            .then(user => {
              const id = user.id
              const payload = { email, id }
              const access_token = generateToken(payload)

              res.status(201).json({
                message: 'Successfully registered!',
                access_token, user
              })
            })
            .catch(next)
        }
        else {
          console.log("ada user pas google sign in", user);
          
          payload = {
            email: payload.email,
            id: user.id
          }
          const access_token = generateToken(payload)

          res.status(200).send({
            message: 'Successfully logged in!',
            access_token, user
          })
        }
      })
      .catch(next)
  }

  static fetchOne(req, res, next) {
    User
      .findById(req.user.id)
      .then(user => {
        res.status(200).send(user)
        // console.log(user);
      })
      .catch(next)
  }
}

module.exports = ControllerUser