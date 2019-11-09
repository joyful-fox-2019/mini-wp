module.exports =  (err, req, res, next) => {
    // console.log(err)

    let status = err.status || 500
    let message = err.message || 'Internal Server Error'

    if(err.name === 'ValidationError') {
      const errors = []
      for(key in err.errors) {
        errors.push(err.errors[key].message)
      }
      res.status(400).json({
        message: 'validation error',
        errors
      })
    } else if(err.name === 'JsonWebTokenError') {
      status = 403
      message = 'You must login first'
      res.status(status).json({ message })
    } else {
      res.status(status).json({ message })
    }
  }
