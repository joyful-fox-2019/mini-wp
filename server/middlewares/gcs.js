const multer = require('multer')
const uploadToGcs = require('./gcsUpload')

module.exports = ({ limits, gcsConfig }) => {
  const multerStorage = multer.memoryStorage()
  const upload = multer({ storage: multerStorage, limits })

  return {
    single: (fieldname) => [
      upload.single(fieldname),
      async (req, res, next) => {
        // console.log(req.body,'================GCSJS');
        if(req.file && req.body.title && req.body.content) {
          try {
            req.body[fieldname] = await uploadToGcs({ file: req.file, gcsConfig })
            next()
          } catch (error) {
            next(error)
          }
        } else {
          next ()
        }
      }
    ]
  }
}