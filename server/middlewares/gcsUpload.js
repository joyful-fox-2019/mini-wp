const gcsUpload = require('gcs-upload')
const multiparty = require('multiparty');

// module.exports = {
//   upload: function(req, res, next) {
//     let uploader = gcsUpload({
//       limits: {
//         fileSize: 1e6 // in bytes
//       },
//       gcsConfig: {
//         keyFilename: '../keyfile.json',
//         bucketName: process.env.GOOGLE_BUCKET_NAME
//       }
//     })

//     // let form = new multiparty.Form();
//     //   form.parse(req, function(err, fields, files) {
//     //   let image = files.featuredImage[0];
//     //   uploader.single(image);
//     // });
//     // console.log('masuk sini dong')
//     // next();
//   }
// }

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: './keyfile.json',
    bucketName: process.env.GOOGLE_BUCKET_NAME
  }
})

module.exports = upload