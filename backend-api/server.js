
'use strict';
require('dotenv').config();

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');

require('./api/models/UserModel');
require('./api/models/PostModel');

var bodyParser = require('body-parser');


// moongose instance
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});


app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

// register routes
var routes = require('./api/routes/Routes');
routes(app);

app.listen(port);
console.log("Backend API started on port: " + port);

