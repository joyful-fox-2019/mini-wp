const router = require('express').Router()
const { multer,sendUploadToGCS } = require('../middlewares/uploader');
const Authenticate = require('../middlewares/Authenticate');
const ArticleController = require('../controllers/article')

router.post('/uploadgcs', Authenticate, multer.single('image'), sendUploadToGCS, ArticleController.uploadGCS);

module.exports = router;