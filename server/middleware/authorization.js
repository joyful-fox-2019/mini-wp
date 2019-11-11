const Article = require('../models/Article');

function authorization(req, res, next){
    // console.log('authorization invoked')
    let id = req.params.id
    let UserId = req.decode.id
    // console.log(UserId)
    // console.log(id)
    Article.findById(id)
        .then(( article ) => {
            if(!article){
                next({ status:404, message : "article not found" })
            } else {
                // console.log(article)
                if ( article.UserId == UserId ){
                    next()
                } else {
                    next({ status:401, message : "Not authorized user" })
                }
            }
        })
        .catch(next)
}

module.exports = authorization
