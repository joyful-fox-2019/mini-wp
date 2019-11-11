const Article = require('../models/article');

class ArticleController {
    static findAll(req, res, next) {
        let id = req.decoded.id
        Article.findOne({
                author: id
            })
            .then(articles => {
                // console.log(articles);
                res.status(200).json(
                    articles
                )
            })
            .catch(err => {
                console.log(err)
            })
    }

    static create(req, res, next) {
        console.log("createe => ", req.body)
        console.log("decoded ==>", req.decoded._id)
        let {
            title,
            content,
            imgUrl
        } = req.body
        Article.create({
                title,
                content,
                image: imgUrl,
                author: req.decoded.id
            })
            .then(() => {
                res.status(201).json({
                    message: "success add new article"
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    static delete(req, res, next) {
        Article.deleteOne({
                _id: req.params.id
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
            })
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