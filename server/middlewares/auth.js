const { decodeToken } = require('../helpers/jwt')
const Article = require('../models/article')
const User = require('../models/user')


const authentication = (req, res, next) => {
    try {
        req.loggedUser = decodeToken(req.headers.token)
        User.findOne({
            email: req.loggedUser.email
        })
            .then(user => {
                if (user) next()
                else throw new Error({ status: 401, message: 'Oops!! Authentication Failed' })
            })
            .catch(next)
    }
    catch (error) {
        next(error)
    }
}

const authorization = (req, res, next) => {
    console.log(req.body);
    let { id } = req.params
    Article.findOne({ _id: id, author: req.loggedUser.id })
        .then(article => {
            if (article) {
                next()
            }
            else {
                next({
                    status: 400,
                    message: `You're not authorize to perform this action`
                })
            }
        })
        .catch(err => {
            next({ status: 403, message: err })
        })
}


module.exports = {
    authentication,
    authorization
}