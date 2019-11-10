const Article = require('../models/Article')
const gcsRemove = require('../helpers/gcsRemove')
const { Storage } = require('@google-cloud/storage')


class ArticleController {

    static create(req, res, next) {
        const { title, content, tags, file } = req.body
        const userId  = req.decode.id
        Article.create({ title, content, tags, userId, file })
            .then(article => {
                res.status(201).json(article)
            })
            .catch(next)
    }

    static find(req, res, next) {
        const userId = req.decode.id
        Article.find({ userId }).populate('userId', 'email').sort({ updatedAt: -1 })
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        let {id} = req.params
        Article.findById(id).populate('userId', 'email')
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static findByIdRead(req, res, next) {
        let {id} = req.params
        Article.findById(id).populate('userId', 'email')
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static update(req, res, next) {
        let id = req.params.id
        const { title, content, tags, file } = req.body
        Article.findById(id)
            .then(article => {
                const BUCKET_NAME = process.env.BUCKET_NAME
                const storage = new Storage({
                    projectId: process.env.PROJECT_ID,
                    keyFilename: process.env.KEYFILE_PATH
                })
                if (file) {
                    let deleteFile = article.file
                    article.file = file
                    let filename = deleteFile.replace(/(https:\/\/storage.googleapis.com\/v2-upload-gcs\/)/, '')
                    storage
                        .bucket(BUCKET_NAME)
                        .file(filename)
                        .delete()
                }
                if (title) article.title = title
                if (content) article.content = content
                if (tags) article.tags = tags
                return article.save()
            })
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const id = req.params.id
        Article.findByIdAndDelete(id)
            .then(article => {
                gcsRemove(article.file)
                res.status(200).json(article)
            })
            .catch(next)
    }

    static search(req, res, next) {
        const userId = req.decode.id
        const { keyword, tag } = req.query
        let parameter = {
            tags: {
                $regex: `${tag}`,
                $options: 'i'
            },
            userId
        }
        if (keyword !== undefined) {
            parameter = {
                $or: [
                    {
                        title: {
                            $regex: `${keyword}`, $options: 'i'
                        }
                    },
                    {
                        content: {
                            $regex: `${keyword}`, $options: 'i'
                        }
                    },
                    {
                        tags: {
                            $regex: `${keyword}`,
                            $options: 'i'
                        }
                    }
                ],
                userId
            }
        }
        Article.find(parameter).populate('userId', 'email').sort({ updatedAt: -1 })
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static findTop(req, res, next) {
        Article.find().populate('userId').sort({ reader: -1 }).limit(4)
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        Article.find().populate('userId').sort({ cretaedAt: -1 })
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static upvote(req, res, next) {
        const userId = req.decode.id
        const id = req.params.id
        Article.findById(id)
          .then(article => {
            if (article) {
              let downvotes = article.downvotes.indexOf(userId)
              let upvotes = article.upvotes.indexOf(userId)    
              if (downvotes > -1)  article.downvotes.splice(downvotes, 1)
              if (upvotes > -1)  article.upvotes.splice(upvotes, 1)
              else article.upvotes.push(userId)
              return article.save()
            }
          })
          .then((article) => {
            res.status(200).json({ 
                message: 'success upvote', article
            })
          })
          .catch(next)
      }
    
    
      static downvote(req, res, next) {
        const userId = req.decode.id
        const id = req.params.id
    
        Article.findById(id)
          .then(article => {
            if (article) {
              let downvotes = article.downvotes.indexOf(userId)
              let upvotes = article.upvotes.indexOf(userId)

              if (upvotes > -1)  article.upvotes.splice(upvotes, 1)
              if (downvotes > -1) article.downvotes.splice(downvotes, 1)
              else article.downvotes.push(userId)
              return article.save()
            }
          })
          .then((article) => {
            res.status(200).json({ 
                message: 'success downvote', article
            })
          })
          .catch(next)
      }

      static incrementReader(req, res, next) {
        const id = req.params.id
        Article.findByIdAndUpdate(id,  { $inc: {reader: 1 } } )
            .then(article => {
                res.status(201).json(article)
            })
            .catch(next)
    }

}

module.exports = ArticleController