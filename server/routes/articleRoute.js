const router = require('express').Router();
const ArticleController = require('../controllers/articleController');
const authenticate = require('../middlewares/authenticate');
const author = require("../middlewares/authorization");
const upload = require("../middlewares/upload")

router.use(authenticate);

router.get('/:id', author, ArticleController.getDetail);
router.get('/', ArticleController.getAll);
router.post('/', upload.single('file'), ArticleController.create);
router.put('/:id', author, upload.single('file'), ArticleController.update);
router.delete('/:id', author, ArticleController.delete);

module.exports = router;