const Article = require('../models/article')

class ArticleController {
    static async uploadGCS(req,res,next){
        try {
          let _id = req.user.id
          let name = req.file.originalname
          let location = req.file.cloudStoragePublicUrl
          let data = {name,location}
          res.status(201).json(data)
        } catch (error) {
          next(error)
        }
      }

    static createArticle(req,res,next){
        Article.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id,
            featured_image: req.body.imageUrl
        })
        .then(article => {
            res.status(201).json(article);
        })
        .catch(err => {
            next(err)
        })
    }

    static getArticles(req,res,next){
        Article.find()
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            next(err)
        })
    }

    static findUserArticle(req,res,next){
        Article.find({
            author: req.user.id
        })
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            next(err)
        })
    }

    static getOneArticle(req,res,next){
        Article.findOne({
            _id: req.params.id
        })
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            next(err)
        })
    }

    static editArticle(req,res,next){
        Article.findOne({
            _id: req.params.id
        })
        .then(article => {
            return Article.updateOne({
                _id: article._id
            },
            {
                title: req.body.title || article.title,
                content: req.body.content || article.content,
                created_at: article.created_at,
                author: article.author,
                updated_at: new Date(),
                featured_image: req.body.imageUrl || article.imageUrl
            })
        })
        .then(response => {
            res.status(200).json({
                message: "updated success"
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteArticle(req,res,next){
        Article.deleteOne({
            _id: req.params.id
        })
        .then(response => {
            res.status(200).json({
                message: 'Delete success'
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ArticleController;