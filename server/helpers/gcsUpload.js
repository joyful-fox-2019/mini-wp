const { Storage } = require('@google-cloud/storage');
const GCLOUD_BUCKET = process.env.GCLOUD_BUCKET;
const storage = new Storage({
	projectId: process.env.GCLOUD_PROJECT,
	keyFilename: process.env.KEYFILE_PATH
});
const bucket = storage.bucket(GCLOUD_BUCKET);

const getPublicUrl = filename => {
	return `https://storage.googleapis.com/${GCLOUD_BUCKET}/${filename}`;
};

module.exports = file => {
	if (!file) {
		return { err: { status: 400, message: 'file not found' } };
	}

	const gcsname = Date.now() + file.originalname;

	const bucketFile = bucket.file(gcsname);

	const stream = bucketFile.createWriteStream({
		metadata: {
			contentType: file.mimetype
		}
	});

	stream.on('error', err => {
		return { err };
	});

	stream.on('finish', async () => {
		const result = {};
		result.cloudStorageObject = gcsname;
		result.cloudStoragePublicUrl = await bucketFile.makePublic().then(() => {
			return getPublicUrl(gcsname);
		});
		return result;
	});

	stream.end(file.buffer);
};
