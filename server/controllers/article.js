const ArticleModel = require('../models/article')

module.exports = {
    findAll(req,res,next){
        ArticleModel.find({author : req.loggedUser.id})
            .populate('author')
            .then(articles=>{
                res.status(200).json(articles)
            })
            .catch(next)
    },
    create(req,res,next){
        const author = req.loggedUser.id
        const { title, content ,imageUrl } = req.body
        const article = { title, content, author, imageUrl}
        ArticleModel.create(article)
            .then(article=>{
                res.status(201).json(article)
            })
            .catch(next)
    },
    updatePatch(req,res,next){
        const { id } = req.params
        const { title, content, imageUrl } = req.body
        const article = {}
        title ? article.title = title : ''
        content ? article.content = content : ''
        content ? article.content = imageUrl : ''
        ArticleModel.findOneAndUpdate({
            _id : id
        },article,{
            new : true
        })
        .then(article=>{
            res.status(200).json(article)            
        })
        .catch(next)
    },
    updatePut(req,res,next){
        const { id } = req.params
        const { title, content, imageUrl } = req.body
        const article = { title, content, imageUrl }
        ArticleModel.findOneAndUpdate({
            _id : id
        },article,{
            new : true
        })
        .then(article=>{
            res.status(200).json(article)            
        })
        .catch(next)
    },
    delete(req,res,next){
        const { id } = req.params
        ArticleModel.findOneAndDelete({
            _id : id
        })
        .then(article=>{
            res.status(200).json(article)            
        })
        .catch(next)
    }
}