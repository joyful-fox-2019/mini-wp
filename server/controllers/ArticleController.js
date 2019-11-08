const Article = require('../models/article.js');

class ArticleController {
	static create(req, res) {
		Article.create(req.body)
		.then(( article ) => {
			res.status(200).json(article)
		})
		.catch(( err ) => {
			res.status(500).json(err)
		})
	}

	static findAll(req, res) {
		Article.find()
		.then(( articles ) => {
			res.status(200).json( articles )
		})
		.catch(( err ) => {
			res.status(500).json(err)
		})
	}

	static findOne(req, res) {
		Article.findOne({ _id: req.params.id })
		.then(( articles ) => {
			res.status(200).json( articles )
		})
		.catch(( err ) => {
			res.status(500).json(err)
		})
	}

	static update(req, res) {
		Article.findOneAndUpdate({ _id: req.params.id }, req.body )
		.then(( articles ) => {
			res.status(200).json( articles )
		})
		.catch(( err ) => {
			res.status(500).json(err)
		})
	}

	static delete(req, res) {
		Article.findOneAndDelete({ _id: req.params.id })
		.then(( articles ) => {
			res.status(200).json( articles )
		})
		.catch(( err ) => {
			res.status(500).json(err)
		})
	}	
}

module.exports = ArticleController