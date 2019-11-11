const AWS =require('aws-sdk')
AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_KEY_ID,
  region: 'us-east-1'
});
function deleteFile(key) {
  var bucketInstance = new AWS.S3();
  var params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key
  };
  bucketInstance.deleteObject(params, function (err, data) {
    if (data) {
      console.log("File deleted successfully");
    }
    else {
      console.log("Check if you have sufficient permissions : " + err);
    }
  });
}

module.exports = deleteFile