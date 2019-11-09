const Article = require("../models/article.js");
const gcsDelete = require("../middlewares/gcsdelete.js");

class ArticleController {
    static findAll (req, res, next) {
        Article.find({
            status: true
        })
        .sort({
            createdAt: "DESC"
        })
        .then((articles) => {
            res.status(200).json(articles);
        })
        .catch((err) => {
            next(err);
        });
    }
    static find (req, res, next) {
        Article.find({
            UserId: req.user._id
        })
        .sort({
            createdAt: "DESC"
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
            err = { status: 404, message: `Article not found.` }
            next(err);
        });
    }
    static create (req, res, next) {
        if (req.file) {
            let tags = [];
            if (req.body.tags) {
                tags = req.body.tags.split(",");
            }
            Article.create({
                title: req.body.title,
                content: req.body.content,
                author: req.body.author,
                featured_image: req.file.cloudStoragePublicUrl,
                tags: tags,
                status: true,
                UserId: req.user._id
            })
            .then((article) => {
                res.status(201).json(article);
            })
            .catch((err) => {
                next(err);
            });
        } 
        else {
            let err = { status: 400, message: `Feature image is required.` }
            next(err);
        }
    }
    static update (req, res, next) {
        Article.findById(req.params.id)
        .then((found) => {
            let tags = [];
            if (req.body.tags) {
                tags = req.body.tags.split(",");
            }
            let updateFields = {
                title: req.body.title,
                content: req.body.content,
                author: req.body.author,
                tags: tags,
                status: req.body.status,
            }
            if (req.file) {
                gcsDelete(found.featured_image);
                updateFields["featured_image"] = req.file.cloudStoragePublicUrl;
            }
            return Article.updateOne({
                        _id: req.params.id,
                        UserId: req.user._id
                    }
                    , { $set : updateFields });
        })
        .then((updated) => {
            res.status(200).json(updated);
        })
        .catch((err) => {
            next(err);
        });
    }
    static delete (req, res, next) {
        Article.findOne({
            _id: req.params.id
        })
        .then((found) => {
            gcsDelete(found.featured_image);
            return Article.deleteOne({
                _id: req.params.id
            });
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