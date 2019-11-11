const { Storage } = require('@google-cloud/storage')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE
})

async function deleteFileFromGCS(url) {
  let fileName = url.split('/').pop()
  try {
    await storage
      .bucket(CLOUD_BUCKET)
      .file(fileName)
      .delete()
  } catch(err) {
    next(err)
  }
}

module.exports = deleteFileFromGCS