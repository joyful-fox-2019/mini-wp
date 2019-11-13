const router = require('express').Router();
const userRouter = require('./user');
const articleRouter = require('./article');

router.use('/users', userRouter);
router.use('/articles', articleRouter);

module.exports = router;