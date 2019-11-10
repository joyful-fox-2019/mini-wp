const Article = require("../models/article");
const {Schema} = require("mongoose");

module.exports = (req, res, next)=>{
    Article.findOne({
        _id: req.params.id
    })
    .then(article=>{
        if(article.UserId != req.userid){
            res.status(401).json({msg: "no authorization"})
        }
        next();
    })
    .catch(err=>{
        next(err);
    })
}