const routes = require('express').Router();
const ArticleController = require('../controllers/article')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')


routes.get('/', ArticleController.find)

routes.use(Authentication)
routes.get('/user', ArticleController.findByUser)
routes.get('/search', ArticleController.search)
routes.get('/searchtag', ArticleController.searchTag)
routes.get('/:id', ArticleController.findOne)
routes.post('/', multer.single('img'), gcs, ArticleController.create)

routes.use('/:id', Authorization)
routes.delete('/:id', ArticleController.delete)
routes.put('/:id', multer.single('img'), gcs, ArticleController.update)

module.exports = routes