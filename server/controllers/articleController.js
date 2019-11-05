const Article = require('../models/article')

class ArticleController {

  static create(req, res, next) {
    let { title, content } = req.body
    Article.create({
      title,
      content
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static all(req, res, next) {
    Article.find()
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }
  static one(req, res, next) {
    let { id } = req.params
    Article.findOne({
      _id: id
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
  static update(req, res, next) {
    let { id } = req.params
    let { content } = req.body
    Article.findOneAndUpdate({
      _id: id
    },{
      content
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let { id } = req.params
    Article.findOneAndDelete({
      _id: id
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ArticleController