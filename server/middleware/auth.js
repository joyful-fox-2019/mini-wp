const User = require('../models/user')
const { decodeToken } = require('../helpers/jwt')
const Article = require('../models/article')

module.exports = {
  authentication: function (req,res,next) {
    console.log(req.headers)
    if(req.headers.access_token){
      req.loggedUser = decodeToken(req.headers.access_token)
      console.log(req.loggedUser)
      next()
    }
    else{
      res.status(401).json({ message:"Invalid Authentication" })
    }
  },
  authorization: async function (req,res,next) {
    const {_id} = req.params // ArticleId
    try{
      const articleData = await Article.findOne({ _id })
      if(articleData){
        if(articleData.UserId == req.loggedUser._id){
          next()
        }
        else{
          throw { message:"Invalid Authorization",status:401 }
        }
      }
      else{
        throw { message:"Data not found",status:404 }
      }
    }
    catch(err){
      next(err)
    }
  }
}