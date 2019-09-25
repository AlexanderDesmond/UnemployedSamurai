'use strict';
require('dotenv').config();

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');

require('./api/models/UserModel');
require('./api/models/PostModel');

var bodyParser = require('body-parser');


// moongose instance
mongoose.Promise = global.Promise;

// database connection uri different for testing
if (process.env.NODE_ENV == "test")
    mongoose.connect(process.env.TEST_MONGO_URI, {useNewUrlParser: true});
else
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

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
module.exports.upload = upload;


app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

// register routes
var routes = require('./api/routes/Routes');
routes(app);

app.listen(port);
console.log("Backend API started on port: " + port);

module.exports = app; // for testing purposes