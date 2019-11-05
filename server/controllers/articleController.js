`use strict`
const Article = require('../models/article')
const User = require('../models/user')

class articleController {

    static findAll(req, res, next) {
        User.
            findOne({
                _id : req.user._id,            
            }).populate('articleList')
            .then (user => {
                res.json(user.articleList)
            })
            .catch(next)
    }

    static add(req, res, next) {
        const {title, content, createdAt} = req.body
        let articleTemp = {}
        Article.
            create({
                title,
                content,
                createdAt
            })
            .then(article => {
                articleTemp = article      
                return User.
                            findOneAndUpdate({
                                _id : req.user._id
                            },
                            {
                                $push : {articleList : article.id}
                            },
                            {
                                new : true
                            })                
            })
            .then(user => {                
                res.status(201).send(articleTemp)
            })
            .catch(next)
    }

    static delete(req, res, next) {
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
        let {title, content, createdAt} = req.body
        Article.
            findOneAndUpdate({
                _id : req.params.id
            }, {
                title,
                content,
                createdAt
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