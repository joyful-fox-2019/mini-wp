const router = require('express').Router()
const articleController = require('../controllers/article')


router.get('/', articleController.findAll)
router.post('/', articleController.create)

router.get('/:id', articleController.findOne)
router.delete('/:id', articleController.delete)
router.patch('/:id', articleController.update)

module.exports = router