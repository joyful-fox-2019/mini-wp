const {verifyToken} = require('../helpers/token')
const Post = require('../models/post')

function authentication(req,res,next){
  try{
    req.loggedUser = verifyToken(req.headers.token)
    next()
  }
  catch(error){
    res.status(404).json(error)
  }
}

function authorization(req,res,next){
  Post.findById(req.params.id)
  .then(post =>{
    if(post){
      if(post.UserId == req.loggedUser.id){
        next()
      } else {
        res.status(403).json({message: 'Wrong email or password'})
      }
    } else {
      res.status(403).json({message: 'Wrong email or password'})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
}

module.exports = {
  authentication,
  authorization
}
