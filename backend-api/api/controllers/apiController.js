
'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.create_user = function(req, res) {

    // query db for username
    User.find({username: req.body.username},
        function (err, results) {
            if (err)
                res.send(err);

            // found username?
            if (!results.length) {
                // create new user
                var new_user = new User(req.body);

                // save user to database and send response
                new_user.save(function(err, user) {
                    if (err)
                        res.send(err);
                    res.json(user);
                })
            } 
            // send 409 conflict if username exists
            else {
                res.send(409, {error:"username already exists"});
            }
        }
        
        );
};


exports.get_user = function(req, res) {

    // return user is found (username from request params)
    User.find( {username: req.params.username},
        function(err, result) {
            if (result.length)
                res.json(result[0]);
            else
                res.send(400, {error: "user does not exist"});
        }
    );
}

exports.update_user = function(req, res) {
    res.send(501);
}

exports.delete_user = function(req, res) {
    res.send(501);
}



exports.login_user = function(req, res) {
    
    // get user from db using provided username
    User.find( {username: req.body.username},
        function (err, result) {
            if (err)
                res.send(err);

            // if user exists
            if (result.length) {
                var user = result[0];

                if (user.password == req.body.password) {

                    // update new login in database
                    user.last_login = Date.now();
                    user.save( function(err) {
                        if (err)
                            res.send(err);
                    });

                    // respond with user object
                    res.send(user);
                    return;
                }
            }

            // send error if process incomplete
            res.send(400, {error: "invalid credentials"});
        });
};




// --- cash stuff




