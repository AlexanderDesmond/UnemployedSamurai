'use strict';
require('dotenv').config();

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');

require('./api/models/UserModel');
require('./api/models/PostModel');

var bodyParser = require('body-parser');

// moongose instance
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV == "test") {

    // database connection uri different for testing
    mongoose.connect(process.env.TEST_MONGO_URI, {useNewUrlParser: true});

    // setup image storage in local 'uploads' folder
    var upload = multer({storage: multer.diskStorage({
            destination: function(req, file, cb) {
                // store files in the uploads directory
                cb(null, "uploads");
            },
            filename: function(req, file, cb) {
                // create filename with default request image fieldname + current datetime + provided extension
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
            }
        })
    });

} else {

    // setup s3 instance
    var s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });

    // mongo atlas
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

    var upload = multer({storage: multerS3({
            s3: s3,
            bucket: process.env.AWS_BUCKET_NAME,
            acl: 'public-read',
            contentType: function (req, file, cb) {
                cb(null, file.mimetype);
            },
            metadata: function (req, file, cb) {
                cb(null,
                    {
                        fieldName: file.fieldname,
                        /* originalName: file.origina */
                    }
                );
            },
            key: function (req, file, cb) {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
            }
        })
    }); // multer

} // else

module.exports.upload = upload;


app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

// register routes
var routes = require('./api/routes/Routes');
routes(app);

app.listen(port);
console.log("Backend API started on port: " + port);

module.exports = app; // for testing purposes

