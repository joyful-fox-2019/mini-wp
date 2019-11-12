const Article = require('../models/Article');

class ArticleController {
    static create(req, res, next) {
        const { title, content, featuredImage } = req.body;
       
        Article
            .create({
                title,
                content,
                featuredImage
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static getAll(req, res, next) {
        Article
            .find()
            .then( datas => {
                let filtered = datas.filter(function(art) {
                    return art.UserId == req.decoded.id;
                });
                res.status(200).json(filtered);
            })
            .catch( err => {
                next(err);
            })
    }

    static destroy(req, res, next) {
        Article
            .findByIdAndRemove({_id: req.params.id})
            .then( data => {
                if (!data) {
                    let err = {
                        status: 400,
                        msg: 'data not found.'
                    }
                    next(err);
                }
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

    static show(req, res, next) {
        console.log(req.params.id)
        Article
            .findById(req.params.id)
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => {
                next(err);
            })
    }
}

module.exports = ArticleController;