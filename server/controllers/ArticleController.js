const Article = require('../models/article')

class ArticleController {
    static create(req, res, next) {
        let { title, content } = req.body
        let created_at = new Date
        let author = req.loggedUser.id
        let featured_image = req.file.cloudStoragePublicUrl
        console.log(featured_image)
        Article.create({ title, content, created_at, author, featured_image })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static readAll(req, res, next) {
        const { id } = req.loggedUser
        // console.log(req.loggedUser.id);
        Article.find({ author: id })
            .populate('author')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static readOne(req, res, next) {
        let { id } = req.params
        Article.findById(id)
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static updateField(req, res, next) {
        let { id } = req.params
        let { title, content } = req.body
        let created_at = new Date
        Article.findByIdAndUpdate(id, {$set: {title, content, created_at }}, { omitUndefined: true })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    static deleteArticle(req, res, next) {
        let { id } = req.params
        Article.deleteOne({ _id: id })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    // static search(req, res, next) {
    //     console.log('it could be fair in a couple of hourssssss');
    //     let { title } = req.query
    //     // console.log(keyword);
    //     Article.find({title: { $regex: title }})
    //         .then(articles => {
    //             res.status(200).json(articles)
    //         })
    //         .catch(next)
    // }
}

module.exports = ArticleController