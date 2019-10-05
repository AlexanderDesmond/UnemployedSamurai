
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema( {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
    },
    post_count: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('Users', UserSchema);



