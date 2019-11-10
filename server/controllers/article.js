const Article = require('../models/Article')

module.exports = {
  find: (req, res, next) => {
    Article.find().populate('user').sort({ createdAt: 'desc' })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  },
  findOne: (req, res, next) => {
    Article.findById(req.params.id).populate('user')
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  },
  add: (req, res, next) => {
    console.log(req.body)
    const { title, subtitle, description, tags, file } = req.body
    Article.create({ title, subtitle, description, tags, image: file, user: req.loggedUser._id })
      .then(article => {
        res.status(201).json(article)
      })
      .catch(next)
  },
  update: (req, res, next) => {
    console.log(req.body)
    const { title, subtitle, description, file } = req.body
    let tags = req.body.tags.split(', ')
    console.log(tags)
    Article.findByIdAndUpdate(req.params.id,
      { title, subtitle, description, tags, image: file },
      { omitUndefined: true, new: true })
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  },
  delete: (req, res, next) => {
    Article.findByIdAndDelete(req.params.id)
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }
}