const router = require('express').Router();
const articleRouter = require('./article');

router.get('/', (req, res, next) => {
    res.send('connected yo.')
})
router.use('/articles', articleRouter)

module.exports = router;