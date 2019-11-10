module.exports = (err, req, res,  next)=>{
  console.log(err);
  
  if(err.name == 'ValidationError'){
    let errs = []
    for(path in err.errors){
      errs.push(err.errors[path].message)
    }
    res.status(400).json({
      errors: errs
    })
  }
  else if(err.name == 'CastError'){
    res.status(400).json({
      errors: `${err.value} is not found`
    })
  }
  else{
    res.status(500).json(err)
  }
}