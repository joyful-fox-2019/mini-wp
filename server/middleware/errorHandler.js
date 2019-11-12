module.exports = function (err, req, res, next) {
  console.log(err,"from error handler")

  const message = err.message || 'Internal Server Error'
  const status =  err.status || 500

  if(err.name === "ValidationError"){
    const errors = []
    for(key in err.errors){
      errors.push(err.errors[key].message)
    }
    res.status(400).json({
      message: 'Validation error',
      errors
    })
  }
  else if(Error.message === "JsonWebTokenError"){
    res.status(status).json({
      message: err.message.message
    })
  }
  else{
    res.status(status).json({message})
  }
}