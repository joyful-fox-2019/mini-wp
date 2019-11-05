const router = require('express').Router()
const articleController = require('../controllers/articleController')

router.post('/', articleController.create)
router.get('/', articleController.all)
router.get('/:id', articleController.one)
router.put('/:id', articleController.update)
router.delete('/:id', articleController.delete)

module.exports = router