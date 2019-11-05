const router = require('express').Router()
const articleController = require('../controllers/article')


router.get('/', articleController.getAll)

router.post('/', articleController.createArticle)

router.put('/:id', articleController.updateArticle)

router.delete('/:id', articleController.deleteArticle)


module.exports = router