const User = require('../models/').User;
const Article = require('../models/').Article;
const verifyToken = require('../helpers.jwt.js').verifyToken;

const authentication = (req, res, next) => {
	let token = req.headers.jwt_token;
	if( token ) {
		try {
			let decode = verifyToken(token)
			if( decode ) {
				req.decode = decode;
				next()
			} else {
				next({ status: 403})
			}
		} catch( err ) {
			next({ status: 400 })
		}
	} else {
		next({ status: 403 })
	}
}

const articleAuth = (req, res, next) => {
	let articleId = req.params.id;

	if( articleId ) {
		Article.findOne({ _id: articleId })
		.then(( foundedArticle ) => {
			if( !foundedArticle ) {

			}
		})
	}
}

const userAuth = (req, res, next) => {
	let userId = req.decode.id

	if( userId ) {
		User.findOne({ _id: userId })
		.then(( foundedUser) => {
			if( !foundedUser ) {
				throw({ status: 404 })
			} else if( foundedUser._id == req.decode.id ) {
				next();
			} else {
				throw({ status: 401 })
			}
		})
		.catch(next)
	}
}

module.exports = {
	authentication: authentication,
	articleAuth: articleAuth,
	userAuth: userAuth
}