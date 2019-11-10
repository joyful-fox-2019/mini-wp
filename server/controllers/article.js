const Article = require('../models/article')


class ArticleController {
    static getAll(req, res, next) {
        Article.find({
                status: 'Published'
            })
            .populate('author')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static getMine(req, res, next) {
        let objId = {
            author: req.decoded._id
        }
        Article.find(objId)
            .populate('author')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static createArticle(req, res, next) {
        console.log(req.body)
        Article.create({
                title: req.body.title,
                content: req.body.content,
                featured_image: req.file.cloudStoragePublicUrl,
                author: req.decoded._id
            })
            .then(article => {
                res.status(201).json({
                    article
                })
            })
            .catch(next)
    }

    static updateArticle(req, res, next) {
        let objUpdate = {}
        if (req.file && req.file.cloudStoragePublicUrl) {
            objUpdate = {
                title: req.body.title,
                content: req.body.content,
                featured_image: req.file.cloudStoragePublicUrl,
                status: req.body.status
            }
        } else {
            objUpdate = {
                title: req.body.title,
                content: req.body.content,
                status: req.body.status
            }
        }
        Article.findByIdAndUpdate(req.params.id, objUpdate)
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

module.exports = ArticleController