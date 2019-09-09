var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),

    User = require('./api/models/UserModel'),
    Post = require('./api/models/PostModel'),

    bodyParser = require('body-parser');


// moongose instance
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/imageboard');


app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

// register routes
var routes = require('./api/routes/Routes');
routes(app);

app.listen(port);
console.log("Backend API started on port: " + port);










