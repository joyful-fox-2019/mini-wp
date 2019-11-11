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
        console.log(author);
        
        const { title, content ,image } = req.body
        const article = { title, content, author, image}
        ArticleModel.create(article)
            .then(article=>{
                res.status(200).json(article)
            })
            .catch(next)
    },
    updatePatch(req,res,next){
        const { id } = req.params
        const { title, content, image } = req.body
        const article = {}
        title ? article.title = title : ''
        content ? article.content = content : ''
        content ? article.content = image : ''
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
        const { title, content, image } = req.body
        const article = { title, content, image }
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