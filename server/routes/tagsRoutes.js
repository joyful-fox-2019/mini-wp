const router = require('express').Router()
const tagsController = require('../controllers/tagsController')
const isLogin = require('../middlewares/isLogin')

router.post('/', tagsController.create)
router.get('/', tagsController.getAll)
router.get('/:id', isLogin, tagsController.getOne)
router.get('/filtered/:id', tagsController.getOneFiltered)

module.exports = router