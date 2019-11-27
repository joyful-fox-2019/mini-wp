const router = require('express').Router();
const articleRouter = require('./article');
const UserController = require('../controllers/user');

router.get('/', (req, res, next) => {
    res.send('connected yo.');
})
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/gsign', UserController.gSign);
router.use('/articles', articleRouter)

module.exports = router;