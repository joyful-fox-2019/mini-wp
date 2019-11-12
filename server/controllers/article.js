const Article = require('../models/article')
const toUpdate = require('../helpers/updateField')
const gcsDelete = require('../helpers/gcsdelete')

class articleController {

    static addArticle(req, res, next) {
        console.log(req.body, req.loggedUser.id);
        let { title, content, tags } = req.body
        let UserId = req.loggedUser.id
        let featured_image = req.file.cloudStoragePublicUrl;
        console.log('featured_image')
        Article.create({
            title: title,
            content: content,
            author: UserId,
            tags: tags,
            featured_image: featured_image
        })
            .then(article => {
                res.status(201).json({ article, message: `success created article` })
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        let target = req.query.title || ''
        console.log(req.loggedUser, target);
        Article.find({ title: { $regex: target } })
            .populate("author", "--password")
            .sort({ createdAt: -1 })
            .then(articles => {
                console.log(articles)
                res.status(200).json(articles)
            })
            .catch(err => { console.log(err) })
    }

    static find(req, res, next) {
        console.log(req.loggedUser.id);
        Article.find({
            author: req.loggedUser.id
        })
            .sort({ createdAt: -1 })
            .populate("author", "--password")
            .then(articles => {
                console.log(articles)
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static updateField(req, res, next) {
        console.log('masukaaaaaaaaaaaa');
        // console.log(req.params);
        // console.log(req.body)
        let dataChanged = toUpdate(["title", "content", "tags"], req.body)
        dataChanged.featured_image = req.file.cloudStoragePublicUrl;
        console.log(dataChanged, 'aaaaaaaaaaaaaa');
        const _id = req.params.id;
        Article.findByIdAndUpdate(
            _id,
            {
                $set: { dataChanged }
            },
            {
                omitUndefined: true,
                new: true,
                runValidators: true
            })
            .then(article => {
                res.status(201).json({ article, message: 'success updated article' })
            })
            .catch(err => {
                console.log(err);
            })
    }

    static delete(req, res, next) {
        const _id = req.params.id;
        Article.findById({ _id })
            .then(article => {
                gcsDelete(article.featured_image)
                return Article.findByIdAndDelete(_id)
            })
            .then(success => {
                res.status(200).json({ success, message: 'success deleting article' })
            })
            .catch(next)
    }
}

module.exports = articleController