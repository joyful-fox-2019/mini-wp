const Article = require('../models/Article')

class ArticleController {
    static create (req, res, next) {
        let UserId = req.loggedUser._id
        let { title, content, file, tags } = req.body
        Article.create({
            title,
            content,
            author: req.loggedUser.name,
            featured_image: file,
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
        Article.findOneAndUpdate({
            _id: id
        }, {
            title,
            content,
            tags
        }, {new:true})
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
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static commentArticle (req, res, next) {
        const username = req.loggedUser.username
        const id = req.params.id
        const comment = req.body.comment
        const payload = {
            username,
            comment
        }
        Article.findByIdAndUpdate(id, { $push: { comments: payload } }, { new: true })
        .then (post => {
            res.status(200).json({ post })
        })
        .catch (err => {
            next(err)
        })
    }

    static likeArticle (req, res, next) {
        let { id } = req.params
        let UserId = req.loggedUser._id
        let pass = false
        Article.findById(id)
        .then(article => {
        for (let i = 0; i < article.like.length; i++) {
            if (article.like[i] == UserId) pass = true
        }
        if (pass) {
            return Article.findByIdAndUpdate(id, { $pull: { like: UserId } })
        } else {
            return Article.findByIdAndUpdate(id, { $push: { like: UserId } })
        }
        })
        .then (() => {
        if (pass) res.status(200).json({ msg: 'UnLike' })
        else res.status(200).json({ msg: 'Like' })
        })
        .catch (err => {
            next(err)
        })
    }

    static searchTag (req, res, next) {
        let { tag } = req.params
        Article.find()
        .sort({ createdAt: 'desc' })
        .then (data => {
            if (data.length > 0) {
                let dataArr = []
                for (let el in data) {
                    if (data[el].tags.includes(tag)) {
                        dataArr.push(data[el])
                    }
                }
                res.status(200).json(dataArr)
            } else {
                let err = new Error ('Article User Masih Kosong')
                err.name = 'DataError'
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    }

    static searchArticle (req, res, next) {
        let { title } = req.params
        Article.find()
        .sort({ createdAt: 'desc' })
        .then (data => {
            if (data.length > 0) {
                let dataArr = []
                for (let el in data) {
                    if (data[el].title.includes(title)) {
                        dataArr.push(data[el])
                    }
                }
                res.status(200).json(dataArr)
            } else {
                let err = new Error ('Article User Masih Kosong')
                err.name = 'DataError'
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = ArticleController