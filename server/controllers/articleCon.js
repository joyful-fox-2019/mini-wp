const Article = require('../models/article')
const gcsDelete = require('../helpers/gcsDelete')


class ArticleController {

    static showAll(req,res,next) {
        Article.find()
        .then(articles => {
            res.status(200).json(articles)
        }).catch(next)
    }

    static showArticleUser(req,res,next) {
        console.log(req.loggedUser.id)
        Article.find({
            userId: req.loggedUser.id
        })
        .then(articles => {
            res.status(200).json(articles)
          })
        .catch(next)
    }

    static showOne(req,res,next) {
        Article.findById(req.params.id)
        .then(article => {
            res.status(200).json(article)
        }).catch(next)
    }

    static add(req,res,next) {
        console.log(req.loggedUser)
        const image = req.file ? req.file.cloudStoragePublicUrl : ''
        Article.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.loggedUser.id,
            author: req.body.author,
            image
        })
            .then((newArticle) => {
                res.status(200).json({message:'Add new article succes', newArticle})
            }).catch(next)
    }

    static update(req,res,next) {
        let _id = req.params.id
        Article.findByIdAndUpdate({
            _id
        },{
            title: req.body.title,
            content: req.body.content
        }, {new: true})
            .then((result) => {
                res.status(200).json({message:'Update article succes' ,result})
            }).catch(next)
    }

    static delete(req,res,next) {
        console.log('masuk controller delete')
        let _id = req.params.id
        Article.findById(_id)
        .then(result => {
          gcsDelete(result.image)
          return Article.findByIdAndDelete(_id)
        })
        .then(() => {
          res.status(200).json("Delete Article Success!")
        }).catch(next);
    }
}

module.exports = ArticleController