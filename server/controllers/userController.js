const User = require("../models/User");
const getToken = require('../helpers/jwt').getToken
const verifyHash = require('../helpers/bcrypt').compareHash
const {OAuth2Client} = require('google-auth-library');
const axios = require('axios')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
  static async findAll(req, res, next) {
    try {
      let users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req,res,next){
    try {
      let userId = req.loggedUser._id
      let user = await User.findOne({_id : userId}).populate({path: 'articles',match:{draft: false}})
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async add(req,res,next){
    try {
      let { username,email,password } = req.body
      let user = await User.findOne({email})
      if(user){
        next({status : 409, message: 'Email already in use'})
      } else {
        let created = await User.create({ username,email,password })
        let payload = {
          _id : created._id
        }
        let token = getToken(payload)
        res.status(201).json({token})
      }
      
    } catch (error) {
     next(error) 
    }
  }

  static async login(req,res,next){
    try {
      let {email,password} = req.body
      let findEmail = await User.findOne({ email })
      if (findEmail){
        if (findEmail.loginBy === 'google'){
          next({status : 403, message : 'You have been sign in using google, please login using google'})
        } else if (findEmail.loginBy === 'github'){
          next({status : 403, message : 'You have been sign in using github, please login using github'})
        } else {
          if (verifyHash(password,findEmail.password)){
            let payload = {
              _id : findEmail._id
            }
            let token = getToken(payload)
            res.status(200).json({token})
          } else {
            next({status : 403, message : 'The email/password is incorrect'})
          }
        }
      } else {
        next({status : 403, message : 'The email/password is incorrect'})
      }
    } catch (error) {
      next(error)
    }
  }

  static loginGoogle(req,res,next){
    let { id_token } = req.body
    let payloadJWT
    let username
    let useremail
    client.verifyIdToken({
      idToken : id_token,
      audience : process.env.CLIENT_ID
    })
    .then((tiket)=>{
      const payload = tiket.getPayload()
      const { email, name } = payload
      username = name
      useremail = email
      return User.findOne({email})
    })
    .then((emailFind)=>{
      if(emailFind.loginBy === 'web'){
        next({status : 403, message : 'You have been sign in using email, please login using email'})
      } else if (emailFind.loginBy === 'github') {
        next({status : 403, message : 'You have been sign in using google, please login using google'})
      } else if (emailFind.loginBy === 'google') {
        let { _id } = emailFind._id
        payloadJWT = { _id }
        let token = getToken(payloadJWT)
        res.status(200).json({token})
      } else {
        let password = 'rahasia'
        User.create({username,password,email : useremail, loginBy : 'google'}) 
        .then((created)=>{
          let pyld = {_id:created._id}
          let token = getToken(pyld)
          res.status(200).json({token})
        })
      }
    })
    .catch((error)=>{
      console.log(error)
      next(error)
    })
  }

  static async loginGithub(req,res,next){
    try {
      const { code } = req.query
      const { data:token } = await axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID_GITHUB}&client_secret=${process.env.CLIENT_SECRET_GITHUB}&code=${code}`,
        headers : {
          accept : 'application/json'
        }
      })
      const {data:user} = await axios({
        method: 'get',
        url: 'https://api.github.com/user',
        headers : {
          Authorization: `token ${token.access_token}`,
          scope: 'user:email'
        }
      })
      const {data:email} = await axios({
        method: 'get',
        url: 'https://api.github.com/user/emails',
        headers : {
          Authorization: `token ${token.access_token}`,
          accept : 'application/json'
        }
      })
      let emailGithub = email[0].email
      const emailFind = await User.findOne({email : email[0].email})
      if(emailFind){
        if (emailFind.loginBy === 'web'){
          res.redirect(
            `http://localhost:1234?msg='You have been sign in using email, please login using email'`
          )
        } else if (emailFind.loginBy === 'google') {
          res.redirect(
            `http://localhost:1234?msg='You have been sign in using google, please login using google'`
          )
        } else if (emailFind.loginBy === 'github'){
          let { _id } = emailFind._id
          let payloadJWT = { _id }
          let token = getToken(payloadJWT)
          res.redirect(
            `http://localhost:1234?token=${token}`
          )
        }
      } else {
         let password = 'rahasia'
         let username = user.login
         const created = await User.create({ username,email:emailGithub,password, loginBy: 'github' })
         let payload = {
           _id : created._id
         }
         let token = getToken(payload)
         res.redirect(
           `http://localhost:1234?token=${token}`
         )
      }

    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      let { userId } = req.params
      let arr = ['username','email']
      let field = req.body
      let obj = {}
      arr.forEach(el => {
        for (let key in field){
          if (el === key){
            obj[key] = field[key]
          }
        }
      });

      if(obj.email){
      let findEmail = await User.findOne({email:obj.email})
        if (!findEmail){
          let updated = await User.updateOne({_id : userId},obj)
          res.status(200).json(updated)
        } else {
          next({status : 409, message : 'email already in use'})
        }
      } else {
        let updated = await User.updateOne({_id : userId},obj)
          res.status(200).json(updated)
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async remove(req,res,next){
    try {
      let { userId } = req.params
      let deleted = await User.remove({_id:userId})
      res.status(200).json(deleted)
    } catch (error) {
      next(error)
    }
  }

  static async myBookmark(req,res,next){
    try {
      let userId = req.loggedUser._id
      let bookmark = await User.findOne({_id:userId},'bookmarks').populate('bookmarks')
      res.status(200).json(bookmark)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController;
