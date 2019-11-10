const Article = require('../models/article')
const getObjUpdate = require('../helpers/getObjUpdate')
const awsDelete = require('../helpers/awsDelete')
const axios = require('axios')

class ArticleController {
  static create(req, res, next) {
    if (!req.file) return next({ status: 400, msg: `Image is required!` })
    let { title, content, tag, publish } = req.body
    tag = tag.split(',')
    let { id } = req.logedUser
    let url = req.file.location
    let key = req.file.key
    Article.create({
      title,
      content,
      tag,
      owner: id,
      url,
      key,
      publish
    })
      .then(article => {
        res.status(201).json(article)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Article.find({publish: true}).sort({ updatedAt: 'desc' }).populate('owner', 'username')
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    let { id } = req.params
    Article.findById(id).sort({ createdAt: 'desc' }).populate('owner', 'username')
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static findByTag(req, res, next) {
    let q = new RegExp(req.query.q)
    Article.find({ tag: q }).sort({ createdAt: 'desc' }).populate('owner', 'username')
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static myPost(req, res, next) {
    let owner = req.logedUser.id
    Article.find({ owner }).sort({ createdAt: 'desc' }).populate('owner', 'username')
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static update(req, res, next) {
    let articleId = req.params.id
    let dataUpdate = getObjUpdate(req.body)
    let file = req.file
    Article.findById(articleId)
      .then(article => {
        // gcsDelete(article.url)
        if (file !== undefined) {
          awsDelete(article.key)
          dataUpdate.url = req.file.location
          dataUpdate.key = req.file.key
          return Article.findByIdAndUpdate(articleId, { $set: dataUpdate }, { runValidators: true, new: true })
        } else {
          return Article.findByIdAndUpdate(articleId, { $set: dataUpdate }, { runValidators: true, new: true })
        }
      })
      .then(respon => {
        res.status(200).json(respon)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let { id } = req.params
    Article.findById(id)
      .then(article => {
        // gcsDelete(article.url)
        awsDelete(article.key)
        return Article.findByIdAndDelete(id)
      })
      .then(_ => {
        res.status(200).json('Delete article successed!')
      })
      .catch(next)
  }

  static getQuote(req, res, next) {
    axios({
      method: 'get',
      url: `https://api.quotable.io/random`
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = ArticleController