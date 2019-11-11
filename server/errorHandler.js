module.exports = (err, req, res, next) => {
  let errStatus
  let messages = []

  if (err.name === 'ValidationError') {
    errStatus = 400
    for (let key in err.errors) {
      messages.push(err.errors[key].message)
    }
  }
  else if (err.name === 'MongoError') {
    if (err.keyValue.email) {
      console.log("ini mongoError");
      errStatus = 400
      messages.push('Email address has already been used!')
    }
  }
  else if (err.name === 'wrongEmailOrPassword') {
    errStatus = err.errStatus
    messages.push(err.message)
  }
  else if (err.name === 'Unauthorized') {
    errStatus = err.errStatus
    messages.push(err.message)
  }
  else if (err.name === 'noArticleFound') {
    errStatus = err.errStatus
    messages.push(err.message)
  }
  else {
    messages.push(err.message)
  }
  console.log("Ini messages di error handler");
  console.log(messages)
  console.log(err);

  res.status(errStatus ? errStatus : 500).json({
    messages })
}

