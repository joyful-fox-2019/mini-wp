const Article = require('../models/article')
const deletegcs = require('../helpers/deletegcs')

class ArticleController {
    
    static create (req, res, next) {
        let {title, content, tags, imgUrl} = req.body
        let featured_image = imgUrl
        Article.create({
            title,
            content,
            tags,
            featured_image,
            author: req.loggedUser._id
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static readAll (req, res, next) {
        let condition = {}
        if(req.query.title || req.query.tag){
            condition = {
                $or:[]
            }
            if(req.query.title){
                condition.$or.push({'title': new RegExp(`${req.query.title}`, 'gi')})
            }
            if(req.query.tag){
                condition.$or.push({'tags': new RegExp(`${req.query.tag}`, 'gi')})
            }
        }
        Article.find(condition)
            .populate('author')
            .then( data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static readPersonal (req, res, next) {
        Article.find({author:req.loggedUser._id})
            .populate('author')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static readById (req, res, next) {
        Article.findById(req.params.id)
            .populate('author')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static update (req, res, next) {
        let {title, content, tags, remove, imgUrl} = req.body
        let { id } = req.params

        Article.findById(id)
            .then(result => {
                if(result){
                    let featured_image = []
                    result.featured_image.forEach(image => {
                        if(remove.indexOf(image) == -1){
                            featured_image.push(image)
                        }
                    })
                    imgUrl.forEach(img => {
                        featured_image.push(img)
                    })

                    if(remove){
                        let removeArray = []
                        if(typeof remove == 'string'){
                            removeArray.push(remove)
                        }
                        else{
                            removeArray = remove
                        }
                        removeArray.forEach(foto => {
                            deletegcs(foto)
                        });
                    }

                    return Article.findByIdAndUpdate({_id:req.params.id},
                        {
                            title,
                            content,
                            tags,
                            featured_image
                        }, { runValidators: true }
                    )
                }
                else{
                    throw({status: 404, message:"Article not Found"})
                }
                
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static delete (req, res, next) {
        let { id } = req.params
        Article.findById(id)
            .then(result => {
                if(result){
                    result.featured_image.forEach(foto => {
                        deletegcs(foto)
                    });
                    return Article.findByIdAndDelete(id)
                }
                else{
                    throw({status: 404, message:"Article not Found"})
                }
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = ArticleController
