const Article = require('../models/Article')

class ArticleController {
    static readPublic(req,res,next) {
        Article.find()
        .populate('author')
        .then(data=>{
            res.status(200).json(({data}))
        })
        .catch(next)
    }
    static readPublicDetail(req,res,next) {
        let { id } = req.params
        Article.find({_id:id})
        .populate('author')
        .then(data=>{
            res.status(200).json(({data}))
        })
        .catch(next)
    }
    static readPrivate(req,res,next) {
        Article.find({author:req.loggedUser._id})
        .populate('author')
        .then(data=>{
            res.status(200).json(({data}))
        })
        .catch(next)
    }
    static create(req, res, next){
        let {title,content} = req.body
        let image = req.file
        if(image) {
            Article.create({title,content,author:req.loggedUser._id,featured_image:image.cloudStoragePublicUrl})
            .then(data=>{
                res.status(201).json(({data}))
            })
            .catch(next)
        } else {
            Article.create({title,content,author:req.loggedUser._id})
            .then(data=>{
                res.status(201).json(({data}))
            })
            .catch(next)
        }
    }
    static update(req,res,next) {
        let {title,content} = req.body
        let image = req.file
        let {id} = req.params
        Article.updateOne({_id:id},{title,content,featured_image:image.cloudStoragePublicUrl})
        .then(_=>{
            res.status(201).json(({message:'article updated'}))
        })
        .catch(next)
    }
    static delete(req,res,next) {
        let {id} = req.params
        Article.deleteOne({_id:id})
        .then(_=>{
            res.status(201).json({message:'article deleted'})
        })
        .catch(next)
    }
}

module.exports = ArticleController