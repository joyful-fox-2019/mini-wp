let verifyToken = require('../helpers/jwt').verifyToken
let Article = require('../models/Article')

function authentication(req,res,next){
  try {
    console.log('auth');
    let decodedToken = verifyToken(req.headers.token)
    req.loggedUser = decodedToken
    next()
  } catch (error) {
    next(error)
  }
}

async function authorization(req,res,next){
  try {
    // console.log(req.loggedUser)
    let userId = req.loggedUser._id
    let { articleId }= req.params
    let findArticle = await Article.findOne({ _id : articleId},{ userId })
    if (findArticle){
      next()
    } else {
      next ({status : 403 , message: 'You are not authorized to perform this action'})
    }
  } catch (error) {
    next(error)
  }
  
}

module.exports = {authentication,authorization}


