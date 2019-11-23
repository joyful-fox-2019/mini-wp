const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const articleRoute = require('./articleRoute')
const userRoute = require('./userRoute')
const { multer, sendUploadToGCS } = require('../helpers/gcs')


router.use('/users', userRoute)
router.use(authenticate)
router.use('/articles', articleRoute)
router.post('/upload', multer.single('image'), sendUploadToGCS, (req, res) => {
	res.send({
		status: 200,
		message: 'Your file is successfully uploaded',
		link: req.file.cloudStoragePublicUrl
	});
});

module.exports = router