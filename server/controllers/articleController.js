const Article = require('../models/article')
const User = require('../models/user')

class ArticleController{
    static allArticles(req,res,next){
        Article.find()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static pageArticles(req,res,next){
        let perPage = 5
        let page = req.params.page -1
        Article.find()
        .sort({_id : 'desc'})
        .limit(perPage)
        .skip(perPage * page)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    static oneArticle(req,res,next){
        const articleId = req.params.id
        Article.findOne({_id : articleId})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req,res,next){
        const {title, tag, content, createdAt, author, featured_image} = req.body
        let createdArticle
        Article.create({title, tag, content, createdAt, author, featured_image})
        .then(data=>{
            createdArticle = data
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$push : {articlesId : data._id}})
            
        })
        .then(_=>{
            res.status(201).json({msg : "succesfully created", data : createdArticle})
        })
        .catch(next)
    }

    static update(req,res,next){
        let articleId = req.params.id
        const {title, tag, content, createdAt, author, featured_image} = req.body
        Article.findOneAndUpdate({_id : articleId},{title, tag, content, createdAt, author, featured_image}, {new : true, runValidators : true, omitUndefined : true})
        .then(data=>{
            res.status(200).json({msg : "succesfully updated" ,data})
        })
        .catch(next)
    }

    static delete(req,res,next){
        let articleId = req.params.id
        let deletedArticle
        Article.findOneAndDelete({_id : articleId})
        .then(data=>{
            deletedArticle = data
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$pull : {articlesId : articleId}})
        })
        .then(_=>{
            res.status(200).json({msg:"successfully deleted", data : deletedArticle})
        })
        .catch(next)
        
    }

    static search(req,res,next){
        let filter = req.query.filter || ''
        let filterRegex = new RegExp(filter, 'gi')
        let filtered = []
        Article.find()
        .then(data=>{
            data.forEach(element=>{
                if(element.title.match(filterRegex)){
                    filtered.push(element)
                }
            })
            res.status(200).json(filtered)
        })
        .catch(next)
    }
}

module.exports = ArticleController