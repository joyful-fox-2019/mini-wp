module.exports = (err, req, res, next) => {
  console.log(err.name, "=====================", err);
  
  if (err.status) {
    res.status(err.status).json({ message : err.message})
  } else {
    if (err.name === `ValidationError`) {
      res.status(400).json({ message : `Please insert the content`})
    } 

    else {
      res.status(500).json({ message : `internal server error`})
    }
  }

}