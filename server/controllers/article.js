const Article = require('../models/Article')

module.exports = {
  find: (req, res, next) => {
    Article.find({ })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  },
  add: (req, res, next) => {
    console.log(req.body)
    const { title, content, tags } = req.body
    Article.create({ title, content, tags, user: req.loggedUser._id })
      .then(article => {
        res.status(201).json(article)
      })
      .catch(next)
  },
  update: (req, res, next) => {
    const { title, content } = req.body
    Article.findByIdAndUpdate(
      req.params.id,
      
    )
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }
}