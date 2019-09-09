var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./api/models/UserModel'),
    bodyParser = require('body-parser');


// moongose instance
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/userdb');


app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

// register routes
var routes = require('./api/routes/Routes');
routes(app);

app.listen(port);
console.log("Backend API start on port: " + port);










