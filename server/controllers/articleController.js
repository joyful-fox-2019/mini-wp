`use strict`
const Article = require('../models/article')
const User = require('../models/user')

class articleController {
    
    static findAll(req, res, next) {
        console.log(req.user,'dsfsdafasf')
        Article.
            find({
                user : req.user.id,            
            })
            .then (articles => {
                res.json(articles)
            })
            .catch(next)
    }
    
    static findOne(req, res, next) {
        console.log('masuk findone', req.params.id)
        Article.
            findById(req.params.id)
            .then((article) => {
                if (article) {
                    res.send(article)
                } else {
                    next({
                        status : 404,
                        msg : 'Article Not Found'
                    })
                }
                
            })
            .catch(next)
    }

    static add(req, res, next) {
        console.log('masuk add')
        console.log(req.body)
        const {title, content, featuredImage} = req.body
        Article.
            create({
                title,
                content,
                user : req.user._id,
                featured_image : featuredImage
            })
            // .then(article => {
            //     articleTemp = article      
            //     return User.
            //                 findOneAndUpdate({
            //                     _id : req.user._id
            //                 },
            //                 {
            //                     $push : {articleList : article.id}
            //                 },
            //                 {
            //                     new : true
            //                 })                
            // })
            .then(article => {                
                res.status(201).send(article)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        console.log('masuk delete')
        Article
            .findOneAndDelete({
                _id : req.params.id
            })
            .then(article => {
                if (article) {
                    res.send({
                        msg : 'article succesfully deleted'
                    })
                } else {
                    next({
                        name : 'ArticleError'
                    })
                }
            })
            .catch(next)
    }

    static update(req, res, next) {
        console.log('masuk update')
        let {title, content, createdAt, featured_image, user, updatedAt} = req.body
        Article.
            findOneAndUpdate({
                _id : req.params.id
            }, {
                title,
                content,
                createdAt,
                featured_image,
                user,
                updatedAt
            },{
                new : true
            }).
            then(article => {
                if (article) {
                    res.send({
                        msg : 'Article succesfully updated'
                    })
                } else {
                    next({
                        name : 'ArticleError'
                    })
                }
                
            })
            .catch(next)
    }
}

module.exports = articleController