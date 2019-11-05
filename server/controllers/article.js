const Article = require('../models/article')

class ArticleController {
  static findAll(req, res, next) {
    
    Article.find().sort({ created_at: "desc"  })
    .then(article => {
      res.status(200).json(article)
    })
    .catch(next)
  }

  static findOne(req, res, next) {
    let id = req.params.id
    Article.findById(id)
    .then(article => {
      res.status(200).json({ article })
    })
    .catch(next)
  }

  static create(req, res, next) {
    let { title, content, tags, imgSrc } = req.body
    Article.create({ title, content, tags, imgSrc})
    .then(article => {
      res.status(201).json(article)
    })
    .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    Article.findByIdAndDelete(id)
    .then(article => {
      res.status(200).json(article)
    })
    .catch(next)
  }

  static update(req, res, next) {
    let id = req.params.id
    let { title, content } = req.body
    Article.findByIdAndRemove(id, { $set : {title, content}}, { omitUndefined: true, new: true, runValidators: true})
    .then(article => {
      res.status(200).json({ article })
    })
    .catch(next)
  }
}

module.exports = ArticleController