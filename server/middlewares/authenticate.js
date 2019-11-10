const jwtHelper = require('../helpers/jwtHelper');

module.exports = (req,res,next)=>{
    try{
        req.userid = jwtHelper.verify(req.headers.token);
        next();
    }
    catch{
        res.status(400).json({msg: `Authentication failed`});
    }
}