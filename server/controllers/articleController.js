const Article = require('../models/article');

class ArticleController {
    static findAll(req, res, next) {
        let id = req.decoded.id
        console.log('id---', id)
        Article.find({
                author: id
            })
            .then(articles => {
                // console.log(articles);
                res.status(200).json(
                    articles
                )
            })
            .catch(next)
    }

    static create(req, res, next) {
        let {
            title,
            content,
            image
        } = req.body
        console.log(req.body)
        Article.create({
                title,
                content,
                image,
                author: req.decoded.id
            })
            .then(() => {
                res.status(201).json({
                    message: "success add new article"
                })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Article.deleteOne({
                _id: req.params.id
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static update(req, res, next) {
        let id = req.params.id;
        let {
            updateTitle,
            updateContent
        } = req.body
        let update = {
            title: updateTitle,
            content: updateContent
        }
        Article.findByIdAndUpdate(id, update)
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = ArticleController;