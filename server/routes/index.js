const router = require('express').Router()
const UserRouter = require('./user');
const ArticleRouter = require('./article');
const GoogleRouter = require('./google');

router.use('/users', UserRouter);
// router.use('/articles', ArticleRouter);
// router.use('/google-signin', GoogleRouter);

module.exports = router;