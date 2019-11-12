module.exports = (err, req, res, next) => {
  console.log(err.name, "=====================", err);
  console.log(err.errors.email.message, "aaaaaa");
  
  
  if (err.status) {
    res.status(err.status).json({ message : err.message})
  } else {
    if (err.name === `ValidationError`) {
      let message = []
      for(let field in err.errors) {
        message.push(field.message)
      }
      res.status(400).json({ message })
    } 

    else {
      res.status(500).json({ message : `internal server error`})
    }
  }

}