const {sign, verify} = require('../helpers/jwt')
const User = require('../models/User')
const Article = require('../models/Article')

async function authentication(req, res, next){
  try{
    const token = req.headers.access_token
    const loggedUser = verify(token)
    const user = User.findOne({email: loggedUser.email})
    if(user){
      req.loggedUser = loggedUser
      next()
    }
    else{
      throw res.status(400).json({
        errors: {
          msg: 'user not found'
        }
      })
    }
  }
  catch{
    res.status(401).json({
      errors: {
        msg: 'login needed'
      }
    })
  }
}

function authorization(req, res, next){
  const _id = req.params.id
  const user = req.loggedUser
  Article.findOne({_id})
    .then(article=>{
      if(article.user_id == user._id){
        next()
      }
      else{
        res.status(403).json({
          errors: {
            msg: 'not authorized'
          }
        })
      }
    })
    .catch(next)
}

module.exports = {
  authentication,
  authorization
}