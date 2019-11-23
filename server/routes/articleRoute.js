const express = require('express')
const articles = express.Router()
const articleController = require('../controllers/articleController')
const authorize = require('../middlewares/authorize')

articles.get('/', articleController.all)
articles.post('/', articleController.create)
articles.get('/q', articleController.search)
articles.use('/:id', authorize)
articles.get('/:id', articleController.one)
articles.put('/:id', articleController.update)
articles.patch('/:id', articleController.publish)
articles.delete('/:id', articleController.delete)

module.exports = articles