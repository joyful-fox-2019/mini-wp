const Article = require("../models/article.js");

class ArticleController {
    static findAll (req, res, next) {
        Article.find({
            UserId: req.user._id
        })
        .then((articles) => {
            res.status(200).json(articles);
        })
        .catch((err) => {
            next(err);
        });
    }
    static findOne (req, res, next) {
        Article.findById(req.params.id)
        .then((article) => {
            res.status(200).json(article);
        })
        .catch((err) => {
            err = { status: 404, messages: `Article not found.` }
            next(err);
        });
    }
    static create (req, res, next) {
        Article.create({
            title: req.body.title,
            content: req.body.content,
            UserId: req.user._id
        })
        .then((article) => {
            res.status(201).json(article);
        })
        .catch((err) => {
            next(err);
        });
    }
    static update (req, res, next) {
        Article.updateOne({
            _id: req.params.id,
            UserId: req.user._id
        }
        , { $set : {
            title: req.body.title,
            content: req.body.content
        }})
        .then((updated) => {
            res.status(200).json(updated);
        })
        .catch((err) => {
            next(err);
        });
    }
    static delete (req, res, next) {
        Article.deleteOne({
            _id: req.params.id
        })
        .then((deleted) => {
            res.status(200).json(deleted);
        })
        .catch((err) => {
            next(err);
        });
    }
}

module.exports = ArticleController;