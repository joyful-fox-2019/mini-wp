const Article = require('../models/Article')

class ArticleController {
    static create (req, res, next) {
        let UserId = req.loggedUser._id
        let { title, content, featured_image, tags } = req.body
        Article.create({
            title,
            content,
            author: req.loggedUser.name,
            featured_image,
            tags,
            UserId
        })
        .then ( result => {
            res.status(201).json(result)
        })
        .catch ( err => {
            next(err)
        })
    }

    static findAll (req, res, next) {
        Article.find({
            UserId: req.loggedUser._id
        })
        .then ( results => {
            res.status(200).json(results)
        })    
        .catch ( err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        let { id } = req.params
        Article.findOneAndDelete({
            _id: id
        })
        .then ( result => {
            res.status(200).json(result)
        })
        .catch ( err => {
            next(err)
        })
    }

    static updateOne (req, res, next) {
        let { title, content, tags } = req.body
        let { id } = req.params
        console.log(title,content, id)
        Article.findOneAndUpdate({
            _id: id
        }, {
            title,
            content,
            tags
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findOne (req, res, next) {
        let { id } = req.params
        Article.findOne({
            _id: id
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findAllArticles (req, res, next) {
        Article.find()
        .sort({createdAt: 'desc'})
        .then (result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch (err => {
            console.log('gak masuk')
            next(err)
        })
    }
}

module.exports = ArticleController