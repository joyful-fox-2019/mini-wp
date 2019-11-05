const Article = require("../models/article");


class ArticleController {
    static find(req, res, next) {
        Article.find({
            username: req.body.username
        }).then((result) => {
            res.status(200).json(result)
        }).catch(next);
    }

    static create(req, res, next) {
        Article.create({
            title: req.body.title,
            content: req.body.content,
            username: req.body.username
        }).then((result) => {
            res.status(201).json(result)
        }).catch(next);
    }

    static delete(req, res, next) {
        Article.deleteOne({
            _id: req.params.id
        }).then((result) => {
            res.status(200).json(result);
        }).catch(next);
    }
}

module.exports = ArticleController;