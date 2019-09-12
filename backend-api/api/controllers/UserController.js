
'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('Users');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


exports.list_all_users = function(req, res) {
    User.find({},
        function(err, users) {
        if (err)
            return res.status(500).send({message:"Internal server error", error: err});
        return res.status(200).send(users);
    });
};


exports.create_user = function(req, res) {

    // query db for username
    User.find(
        {username: req.body.username},
        function (err, results) {
            if (err)
                return res.status(500).send({message:"Internal server error", error: err});

            // if no users with username are found
            if (!results.length) {

                if (!req.body.password)
                    return res.status(400).send({message: "Password not provided"});

                // hash password
                var hashedPassword = bcrypt.hashSync(req.body.password, 8);

                // create new user with hashed password
                // then send back token
                User.create(
                    {
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword
                    },
                    function(err, user) {
                        if (err)
                            return res.status(400).send({
                                message: "There was a problem creating the account",
                                error: err
                            });

                        // create a authentication token
                        var token = jwt.sign({ username: user.username }, config.secret, {
                            expiresIn: 86400
                        });
                        return res.status(200).send({auth: true, token: token});
                    });
            }
            // send 409 conflict if username exists
            else
                return res.status(409).send({message: "username already exists"});
        }
    );
};


exports.get_user = function(req, res) {

    if (!req.params.username)
        return res.staus(400).send({message: "No username provided"});

    // return user is found (username from request params)
    User.find(
        {username: req.params.username},
        function(err, result) {
            if (result.length)
                return res.status(200).send(result[0]);
            else
                return res.status(400).send({message: "user not found"});
        }
    );
}


exports.update_user = function(req, res) {
    res.status(501).send();
}


exports.delete_user = function(req, res) {
    res.status(501).send();
}


exports.login_user = function(req, res) {

    // if a credential is not provided
    if (!req.body.username || !req.body.password)
        return res.status(400).send({message: "Missing credentials"});

    // get user from db using provided username
    User.findOne(
        {username: req.body.username},
        function (err, user) {
            if (err)
                return res.status(500).send({message: "Internal server error"});

            if (user && bcrypt.compareSync(req.body.password, user.password)) {

                // login successful
                // mark login time in db
                user.last_login = Date.now();
                user.save( function(err) {} );

                // create token
                var token = jwt.sign({username: user.username}, config.secret, {
                    expiresIn: 86400
                });

                return res.status(200).send({auth: true, token: token});
            }

            // if no user found or incorrect password
            return res.status(404).send({message: "Invalid credentials"});
        }
    );
};

