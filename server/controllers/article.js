const Article = require('../models/article')

class ArticleController {
  static find (req, res, next) {
    const { keyword , mode, type } = req.query
    let objParams = { type } //type = draft/public
    if(mode === 'mine') objParams.owner = req.loggedUser.id
    if(keyword) { objParams.$or = { 
      title: { $regex: keyword, $options: 'i'},
      content: {$regex: keyword, $options: 'i'},
      tags: keyword
      }
    }
    Article.find(objParams)
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }
  static create (req, res, next) {
    const { title, content, image, tags, mode } = req.body
    const { id } = req.loggedUser
    Article.create({ title, content, image, tags, mode, owner: id })
      .then(article => {
        res.status(201).json({ article, message: 'Succesfully created article'})
      })
      .catch(next)
  }
  static findById (req, res, next) {
    const { id } = req.params
    const { mode } = req.query
    Article.findById(id)
      .then(article => {
        if(mode === 'read') {
          article.reads ++
        } 
          
        return article.save()
      })
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }
  static update (req, res, next) {
    const { id } = req.params
    const { title, content, image, tags, mode } = req.body
    Article.findByIdAndUpdate(id, { title, content, image, tags, mode }, { omitUndefined: true })
      .then(article=> {
        res.status(200).json({ message: `Successfully updated article ${article.title}`})
      })
      .catch(next)
  }
  static remove ( req, res, next ) {
    const { id } = req.params
    Article.findByIdAndRemove(id)
      .then(article => {
        res.status(200).json({ message: `Successfully deleted article ${article.title}`})
      })
      .catch(next)
  }
}

module.exports = ArticleController
