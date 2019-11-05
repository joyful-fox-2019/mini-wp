const Article = require('../models/article')

class ArticleController {
    static create(req, res, next) {
        let { title, content} = req.body
        let created_at = new Date
        let user_id = req.loggedUser.id
        Article.create(title, content, created_at, user_id)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static readAll(req, res, next) {
        const { id } = req.loggedUser
        Article.find({ user_id: id })
            .populate('User')
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
}

module.exports = ArticleController