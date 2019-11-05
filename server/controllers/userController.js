const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { decodeHash } = require('../helpers/bcrypt')

class UserController {

  static async login (req,res,next) {
    const { email, password } = req.params
    try{
      const userData = await User.findOne({ email })
      if(userData){
        if(decodeHash(password, userData.password)){
          let payload = userData
          let token = generateToken(payload)
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
    const { email, name, password } = req.params
    try{
      const UserData = await User.create({ email, name, password })
      res.status(201).json(userData)
    }
    catch(err){
      next(err)
    }
  }

  
}

module.exports = UserController