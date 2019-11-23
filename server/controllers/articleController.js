const Article = require('../models/article')

class ArticleController {

  static create(req, res, next) {
    let { title, content, featuredImage, tags } = req.body
    Article.create({
      UserId: req.payload.id,
      title,
      content,
      featuredImage,
      isActive: false,
      tags
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static search(req, res, next) {
    if (!Array.isArray(Object.values(req.query)[0])) {
      Article.find({
        'UserId': req.payload.id,
        'title': { '$regex': req.query.title, '$options': 'i' } 
      })
        .then(results => {
          res.status(200).json(results)
        })
        .catch(next)
    } else {
      let { tags } = req.query
      Article.find({ tags: { $in: tags } })
        .then(results => {
          res.status(200).json(results)
        })
        .catch(next)
    }
  }

  static all(req, res, next) {
    Article.find({
      UserId: req.payload.id
    })
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
    let { title, content, featuredImage, tags } = req.body
    Article.findOneAndUpdate({
      _id: id
    }, {
      title,
      content,
      featuredImage,
      tags
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static publish(req, res, next) {
    let { id } = req.params
    Article.findOneAndUpdate({
      _id: id
    }, {
      isActive: true
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