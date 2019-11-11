const router = require('express').Router();
const Article = require('../controllers/articleController');
const {
    authentication,
    authorization
} = require('../middleware/auth')
const gcsUpload = require('gcs-upload');

// const upload = gcsUpload({
//     limits: {
//         fileSize: 1e6 // in bytes
//     },
//     gcsConfig: {
//         keyFilename: "./keyfile.json",
//         bucketName: "mini_wp_img"
//     }
// })
router.use(authentication)
router.get('/', Article.findAll);
router.post('/', Article.create);
router.delete('/:id', authorization, Article.delete);
router.put('/:id', authorization, Article.update);

module.exports = router;