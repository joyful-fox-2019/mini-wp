const Article = require("../models/Article")

module.exports = {
    authorization (req, res, next) {
        console.log(req.loggedUser)
        let { id } = req.params
        Article.findOne({
            _id : id
        })
        .then ((result) => {
            let err
            if (!result){
                err = new Error('Data Not Found in Database')
                err.name = 'DataError'
                next(err)
            } else if (result.UserId == req.loggedUser._id){
                next()
            } else {
                err = new Error("Not authorized user")
                err.name = "Unauthorized"
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    }
}