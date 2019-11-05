const router = require('express').Router()
const UserController = require('../controllers/UserController')
const upload = require('../helpers/GCSUpload')
const ArticleController = require("../controllers/ArticleController")

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/loginGoogle', UserController.googleLogin)
router.get("/news", ArticleController.findAllArticles)
router.post('/upload', upload.single('file'), (req, res, next) => {
    try {
        res.status(200).json(req.body)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

module.exports = router