module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') console.log(err)
  let status
  let message

  if (err.name == 'ValidationError'){
    status = 400
    let arr = []
    for (const key in err.errors) { arr.push(err.errors[key].message) }
    message = arr
  } else if (err.name == 'JsonWebTokenError' || err.name == 'TokenExpiredError'){
    status = 401
    message = "You are not logged in or your session expired. Please relogin"
  } else if (err.name == 'MulterError'){
    status = 400
    message = err.message
  } else {
    status = err.status || 500
    message = err.message || err.msg || 'Internal Server Error'
  }
  res.status(status).json({ code: status, message })
}