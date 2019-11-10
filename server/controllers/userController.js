const User = require('../models/User')
const {sign} = require('../helpers/jwt')
const {hash, compare} = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController{
  static login(req, res, next){
    const {email, password} = req.body
    User.findOne({email})
      .then(user=>{
        if(user && compare(password, user.password)){
          const obj = {
            email,
            _id: user._id
          }
          const token = sign(obj)
          res.status(200).json({
            token,
            name: user.name
          })
        }
      })
      .catch(next)
  }

  static register(req, res, next){
    const {name, email, password} = req.body
    const hashedPassword = hash(password)
    User.create({
      email,
      name,
      password: hashedPassword
    })
      .then(user=>{
        res.status(201).json(user)
      })
      .catch(next)
  }

  static gouath(req, res, next){
    const token = req.body.id_token
    let payload
    client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket=>{
        payload = ticket.getPayload()
        return User.findOne({email: payload.email})
      })
      .then(user=>{
        if(user){
          return user
        }
        else{
          const hashedPassword = hash(process.env.DUMMY_PASSWORD)
          return User.create({
            email: payload.email,
            name: payload.given_name,
            password: hashedPassword
          })
        }
      })
      .then(user=>{
        const obj = {
          email: user.email,
          _id: user._id
        }
        const token = sign(obj)
        res.status(200).json({
          token,
          name: user.name
        })
      })
  }
}

module.exports = UserController