const router = require('express').Router();
const ArticleRouter = require('../routes/articleRoute');
const UserController = require('../controllers/userController');

router.use('/articles', ArticleRouter);
router.use('/register', UserController.register);
router.use('/login', UserController.login);

module.exports = router;