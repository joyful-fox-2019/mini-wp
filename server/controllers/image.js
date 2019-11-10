const { Storage } = require('@google-cloud/storage');
const GCLOUD_BUCKET = process.env.GCLOUD_BUCKET;
const storage = new Storage({
	projectId: process.env.GCLOUD_PROJECT,
	keyFilename: process.env.KEYFILE_PATH
});
const bucket = storage.bucket(GCLOUD_BUCKET);

class ImageController {
	static sendUploadResult(req, res, next) {
		res.status(200).json({
			message: 'Upload image success',
			link: req.file.cloudStoragePublicUrl
		});
	}

	static getPublicUrl(gcsname) {
		return `https://storage.googleapis.com/${GCLOUD_BUCKET}/${gcsname}`;
	}

	static uploadToGCS(req, res, next) {
		if (!req.file) {
			return next({ status: 400, message: 'file not found' });
		}

		const gcsname = Date.now() + req.file.originalname;

		const file = bucket.file(gcsname);

		const stream = file.createWriteStream({
			metadata: {
				contentType: req.file.mimetype
			}
		});

		stream.on('error', err => {
			req.file.cloudStorageError = err;
			next(err);
		});

		stream.on('finish', () => {
			req.file.cloudStorageObject = gcsname;
			file.makePublic().then(() => {
				req.file.cloudStoragePublicUrl = ImageController.getPublicUrl(gcsname);
				next();
			});
		});

		stream.end(req.file.buffer);
	}
}

module.exports = ImageController;
