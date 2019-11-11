module.exports= (err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || 'internal server error'
    console.log('-----------------------------------')
    console.log('error ============>',message)
    console.log('-----------------------------------')
    res.status(status).json({message:message})
}
