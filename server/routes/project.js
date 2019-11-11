const router = require('express').Router()
const projectController = require('../controllers/projectController')
const authetication = require('../middlewares/authentication')


router.use(authetication)

router.get('/',projectController.findById)
router.get('/all',projectController.showAlll)
router.post('/',projectController.createProject)
router.delete('/:id',projectController.deleteProject)
router.put('/:id',projectController.updateProject)

module.exports = router