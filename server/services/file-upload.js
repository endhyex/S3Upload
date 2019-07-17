const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
 
const config = require('../config');

aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS,
    accessKeyId: config.AWS_SECRET_KEY,
    region: 'id-tbs'
});

const s3 = new aws.S3()
 
const upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: 'bucket-dhika',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;