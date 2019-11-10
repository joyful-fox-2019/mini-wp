const routes = require('express').Router();
const { ImageController } = require('../controllers');

routes.use('/users', require('./users'));
routes.use('/articles', require('./articles'));
routes.post(
	'/upload',
	require('../middlewares/imageHandler'),
	ImageController.uploadToGCS,
	ImageController.sendUploadResult
);

module.exports = routes;
