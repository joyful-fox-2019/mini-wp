const Article = require('../models/Article');

class ArticleController {
    static create(req, res, next) {
        const { title, content } = req.body;
        Article
            .create({
                title,
                content
            })
            .then( data => {
                res.status(201).json(data);
            })
            .catch( err => {
                next(err);
            })
    }

    static getAll(req, res, next) {
        Article
            .find()
            .then( datas => {
                res.status(200).json(datas);
            })
            .catch( err => {
                next(err);
            })
    }

    static destroy(req, res, next) {
        Article
            .findByIdAndRemove({_id: req.params.id})
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static update(req, res, next) {
        const { title, content } = req.body;
        Article
            .findOneAndUpdate({_id: req.params.id}, { title, content })
            .then( data => {
                console.log(data)
                res.status(200).json(data)
            })
            .catch( err => {
                next(err);
            })
    }
}

module.exports = ArticleController;