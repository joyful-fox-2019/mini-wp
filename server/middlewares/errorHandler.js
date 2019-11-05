module.exports = (err, req, res, next) => {
  console.log(err)
  let messages = []
  if(err.name === 'ValidationError') {
    err.status = 400
    for(let field in err.errors) {
      messages.push(err.errors[field].message)
    }
  } else if(err.code === 11000) {
    err.status = 400
    let field = Object.keys(err.keyPattern)[0]
    messages.push(`${field.substring(0, 1).toUpperCase()}${field.substring(1)} is already exist`)
  } else if(err.name === 'JsonWebTokenError') {
    err.status = 401
    messages.push(`You have to login first`)
  } else if(err.msg) {
    messages.push(err.msg)
  } else {
    err.status = 500
    messages.push('Something went wrong in the server')
  }
  res.status(err.status).json({ messages })
}