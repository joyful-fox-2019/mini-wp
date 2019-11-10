const Article  = require('../models/Article')

class ArticleController{
  static findAll(req, res, next){
    Article.find()
    .populate('user_id')
    .sort({createdAt:'desc'})
      .then(articles=>{
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static findPagination(req, res, next){
    const {page} = req.params
    const perPage = 20
    const getPage = (page - 1) * perPage
    Article.find()
    .populate('user_id')
    .skip(getPage)
    .limit(perPage)
    .sort({createdAt:'desc'})
      .then(articles=>{
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static findOne(req, res, next){
    const _id = req.params.id
    Article.findOne({_id})
    .populate('user_id')
    .sort({createdAt:'desc'})
      .then(article=>{
        res.status(200).json(article)
      })
      .catch(next)
  }

  static findWithTag(req, res, next){
    const {tag} = req.params
    Article.find({tags: tag})
    .populate('user_id')
    .sort({createdAt:'desc'})
      .then(articles=>{
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static findWithTagPagination(req, res, next){
    const {page, tag} = req.params
    const perPage = 20
    const getPage = (page - 1) * perPage
    Article.find({tags: tag})
    .populate('user_id')
    .skip(getPage)
    .limit(perPage)
    .sort({createdAt:'desc'})
      .then(articles=>{
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static create(req, res, next){
    const {title, description, tags, file} = req.body
    const user = req.loggedUser
    const splitTags = tags.split(',')
    Article.create({
      title,
      description,
      tags: splitTags,
      user_id: user._id,
      picture: file
    })
      .then(article=>{
        res.status(201).json(article)
      })
      .catch(next)
  }

  static myArticlesPage(req, res, next){
    const loggedUser = req.loggedUser
    const {page} = req.params
    const perPage = Number(req.query.page) || 10
    const getPage = (page - 1) * perPage
    Article.find({user_id: loggedUser._id})
    .sort({createdAt:'desc'})
    .skip(getPage)
    .limit(perPage)
      .then(articles=>{
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static search(req, res, next){
    const loggedUser = req.loggedUser
    const {search} = req.body
    Article.find({
      user_id: loggedUser._id, 
      title: {$regex: search}
    })
    .sort({createdAt:'desc'})
      .then(articles=>{
        res.status(200).json(articles)
      })      
      .catch(next)
  }

  static deleteArticle(req, res, next){
    const _id = req.params.id

    Article.deleteOne({_id})
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static editArticle(req, res, next){
    const _id = req.params.id
    const {title, description, tags} = req.body
    Article.updateOne({_id}, {
      title,
      description,
      tags
    })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }
}

module.exports = ArticleController