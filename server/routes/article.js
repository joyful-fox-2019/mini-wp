const articles = require('express').Router()
const { findAllPosted,findOne,add,addDraft,findAllDraft,update,remove,tag,findBySlug,addToFav,removeFav } = require('../controllers/articleController')
const auth = require('../middlewares/auth').authentication
const authz = require('../middlewares/auth').authorization
const { multer,sendUploadToGCS } = require('../middlewares/uploader')


articles.get('/posted',findAllPosted)
articles.get('/draft',auth,findAllDraft) // handle authorization
articles.get('/tags', tag)
articles.get('/slug/:slug',findBySlug)
articles.get('/:articleId',findOne)
articles.post('/add',auth,multer.single('image'),sendUploadToGCS,add)
articles.post('/addDraft',auth,multer.single('image'),sendUploadToGCS,addDraft)
articles.delete('/remove/:articleId',auth,authz,remove)
articles.patch('/addbookmark/:articleId',auth,addToFav)
articles.patch('/removebookmark/:articleId',auth,removeFav)
articles.patch('/:articleId',auth,authz,multer.single('image'),sendUploadToGCS,update)

module.exports = articles