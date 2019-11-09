const { Article } = require('../models');

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
			status: req.body.status
		})
			.then(article => {
				res.status(200).json({
					message: 'Article created',
					article
				});
			})
			.catch(next);
	}
}

module.exports = ArticleController;
