const Article = require('../models/Article')
const { deleteFile } = require('../helpers/images')

class ArticleController {
    static readPrivateDetail(req,res,next) {
        let { id } = req.params
        Article.find({_id:id})
        .populate('author')
        .then(data=>{
            res.status(200).json(({data}))
        })
        .catch(next)
    }
    static readPublic(req,res,next) {
        let { tag } = req.query
        let objParams = {}
        if (tag) {
            objParams.tags = tag
        }
        Article.find(objParams)
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
        let tags = req.body.tags.split(',')
        let image = req.file
        if(image) {
            Article.create({
                title,
                content,
                author:req.loggedUser._id,
                featured_image:image.cloudStoragePublicUrl,
                tags
            })
            .then(data=>{
                res.status(201).json(({data}))
            })
            .catch(next)
        } else {
            Article.create({title,
                content,
                author:req.loggedUser._id,
                tags
            })
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
        let id = req.params.id
        Article.findByIdAndDelete(id)
        .then(data=>{
            deleteFile(data.featured_image)
            res.status(204).json()
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ArticleController