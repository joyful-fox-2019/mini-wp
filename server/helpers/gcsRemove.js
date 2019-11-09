const { Storage } = require('@google-cloud/storage')
module.exports = (file) =>{
    if (file) {
        const BUCKET_NAME = process.env.BUCKET_NAME
        const storage = new Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: process.env.KEYFILE_PATH
        })
        let deleteFile = file
        let filename = deleteFile.replace(/(https:\/\/storage.googleapis.com\/v2-upload-gcs\/)/, '')
        storage
            .bucket(BUCKET_NAME)
            .file(filename)
            .delete()
    }
}