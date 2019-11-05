module.exports = (err, req, res, next) => {
  console.log(err)
  let messages = []
  if(err.name === 'ValidationError') {
    err.status = 400
    for(let field in err.errors) {
      messages.push(err.errors[field].message)
    }
  } else if(err.msg) {
    messages.push(err.msg)
  } else {
    err.status = 500
    messages.push('Something went wrong in the server')
  }
  res.status(err.status).json({ messages })
}