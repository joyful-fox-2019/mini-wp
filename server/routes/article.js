const router = require('express').Router();
const Article = require('../controllers/articleController');
const {
    authentication,
    authorization
} = require('../middleware/auth')
const gcsUpload = require('gcs-upload');

const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: "keyfile.json",
        bucketName: "edwin-bucket-96"
    }
})

router.use(authentication)
router.get('/', Article.findAll);
router.post('/', upload.single('image'), Article.create);
router.delete('/:id', authorization, Article.delete);
router.put('/:id', authorization, Article.update);

module.exports = router;