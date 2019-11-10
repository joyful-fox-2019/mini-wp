function errorHandler(err,req,res,next){
  let status = err.status || 500
  let message = err.message || `Internal Server Error`

  if(err.name === 'ValidationError'){
    let arr = []
    for (let key in err.errors){
      arr.push(err.errors[key].message)
    }    
    res.status(400).json({message : `validation error`,arr})
  } else if (err.name === 'JsonWebTokenError') {
    res.status(403).json({message : 'You are not authorize to perform this action'})
  } else if (err.name === 'TokenExpiredError') {
    res.status(403).json({message : 'Token has been expired'})
  } else {
    console.log(err);
    res.status(status).json({message})
  }




}

module.exports = errorHandler