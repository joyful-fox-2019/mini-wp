const Article = require('../models/article')

class articleController {
    static getAll(req, res, next) {
        Article.find()
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static createArticle(req, res, next) {
        Article.create({
                title: req.body.title,
                content: req.body.content
            })
            .then(article => {
                res.status(201).json({
                    article
                })
            })
            .catch(next)
    }

    static updateArticle(req, res, next) {
        Article.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                content: req.body.content
            })
            .then(article => {
                res.status(200).json({
                    article
                })
            })
            .catch(next)
    }

    static deleteArticle(req, res, next) {
        Article.findByIdAndRemove(req.params.id)
            .then(article => {
                res.status(200).json({
                    article
                })
            })
            .catch(next)
    }
}

module.exports = articleController