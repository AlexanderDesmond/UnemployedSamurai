
'use strict';
var jwt = require('jsonwebtoken');
var config = require('../config');


// PRE-REQUEST MIDDLEWARE

// this function is called in order to authenticate tokens before
// certain resources can be accessed.
// the function checks the provided token is not expired
// and relates to a username on the database

// on successful authentication, the username is stored
// inside the request body and can be accessed by the request
// function (such as create_post)
// on error, a 403 forbidden status is returned

// Reference: https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/

exports.verifyToken = function(req, res, next) {

    var token = req.headers['x-access-token'];

    if (!token)
        return res.status(403).send({
            auth: false,
            message: "No token provided"
        });

        jwt.verify(token, config.secret,
            function(err, decoded) {
                if (err)
                    return res.status(500).send({
                        auth: false,
                        message: "Failed to verify token"
                    });

                req.username = decoded.username;
                next();
            }
        );

}

