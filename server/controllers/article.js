const { Article } = require('../models');
const moment = require('moment');

class ArticleController {
	static getUserArticles(req, res, next) {
		Article.find({ author: req.payload.id })
			.then(articles => {
				res.status(200).json({
					message: "User's articles acquired",
					articles
				});
			})
			.catch(next);
	}

	static postArticle(req, res, next) {
		Article.create({
			title: req.body.title,
			content: req.body.content,
			author: req.payload.id,
			status: req.body.status,
			created_at: moment(),
			updated_at: moment()
		})
			.then(article => {
				res.status(200).json({
					message: 'Article created',
					article
				});
			})
			.catch(next);
	}

	static updateArticle(req, res, next) {
		Article.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
			content: req.body.content,
			status: req.body.status,
			updated_at: moment()
		})
			.then(() => {
				res.status(200).json({
					message: 'Update article success'
				});
			})
			.catch(next);
	}
}

module.exports = ArticleController;
