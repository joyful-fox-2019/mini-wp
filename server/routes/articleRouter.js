`use strict`
const articleController = require('../controllers/articleController')
const router = require('express').Router()
const {authenticate, authorize} = require('../middlewares/auth')
router.use(authenticate)
router.get('/', articleController.findAll)
router.post('/', articleController.add)
router.delete('/:id',authenticate, authorize, articleController.delete)
router.put('/:id', authenticate, authorize, articleController.update)

module.exports = router