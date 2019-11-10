const Article = require('../models/Article')

class ControllerArticle {
  static fetchAll(req, res, next) {
    Article
      .find()
      .populate('author')
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static add(req, res, next) {
    const { title, content, imageUrl } = req.body
    const author = req.user.id
    // console.log("ini imageUrl pas add", imageUrl)
    Article.create({
      title, content, imageUrl, author
    })
      .then(response => {
        res.status(201).json({
          message: 'Successfully published an article!',
          response
        })
      })
      .catch(next)
  }

  static fetchOne(req, res, next) {
    const { id } = req.params

    Article
      .findById(id)
      .then(article => {
        if (!article) throw {
          name: 'noArticleFound',
          errStatus: 404,
          message: 'No article found, please try again!'
        }
        res.status(200).json({
          article
        })
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { _id, title, content } = req.body
    console.log('ini di update', req.body);
    
    Article
      .findOneAndUpdate({
        _id 
      },{
        title, content
      }, {
        omitUndefined: true
      })
      .then(article => {
        res.status(200).json({
          message: 'Successfully updated an article!',
          article
        })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const { id } = req.params
    Article
      .findOneAndDelete({ _id: id })
      .then(article => {
        res.status(200).json({
          message: 'Successfully deleted an article!',
          article
        })
      })
      .catch(next)
  }
}

module.exports = ControllerArticle