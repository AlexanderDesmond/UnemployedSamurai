
'use strict';
var jwt = require('jsonwebtoken');
var config = require('../config');


// middleware
// adds username (TODO: change to userid) to request on successful decoding of token
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

                req.username = decoded.username; // TODO: change here
                next();
            }
        );

}

