const router = require('express').Router();
const ArticleRouter = require('../routes/articleRoute');
const UserController = require('../controllers/userController');
const User = require('../models/user');

router.use('/articles', ArticleRouter);
router.use('/register', UserController.register);
router.use('/login', UserController.login);
router.use('/hello', (req, res)=>{
    User.findOne({
        email: 'rendo@mail.com'
    })
    .then(user=>{
        res.status(200).json(user);
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

module.exports = router;