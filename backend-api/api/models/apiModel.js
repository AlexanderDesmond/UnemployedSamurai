
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema( {
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date,
        default: Date.now
    },
    is_admin: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('Users', UserSchema);



