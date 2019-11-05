const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { decodeHash } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

class UserController {

  static async login (req,res,next) {
    const { email, password } = req.body
    try{
      const userData = await User.findOne({ email })
      if(userData){
        if(decodeHash(password, userData.password)){
          let token = generateToken({ _id:userData._id, name:userData.name, email:userData.email })
          res.status(200).json({ access_token: token, name: userData.name, _id:userData._id })
        }
        else{
          throw { message:"Wrong email or password" }
        }
      }
      else{
        throw { message:"Your email has not been registered" }
      }
    }
    catch(err){
      next(err)
    }
  }

  static async register (req,res,next) {
    const { email, name, password } = req.body
    try{
      const UserData = await User.create({ email, name, password })
      res.status(201).json(UserData)
    }
    catch(err){
      next(err)
    }
  }

  static async googleSignIn (req, res, next) {
    try{
      const ticket = await client .verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID_GOOGLE
      })
      const { email,name } = ticket.getPayload()
      const userData = await User.findOne({ email, name, password:"123456" })
      if(userData){
        let payload = userData
        let token = generateToken(payload)
        res.status(200).json({ access_token: token, name: userData.name, _id:userData._id })
      }
      else{
        const userCreateData = await User.create({ email})
        let payload = userCreateData
        let token = generateToken(payload)
        res.status(200).json({ access_token: token, name: userCreateData.name, _id:userCreateData._id })
      }
    }
    catch(err){
      next(err)
    }
  }
}

module.exports = UserController