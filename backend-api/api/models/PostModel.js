
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema( {

    author: { // username
        type: String,
        required: true
    },
    content: { // TODO: use images instead of text
        type: String,
        required: true
    },
    post_date: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: Array,
        default: {}
    },
    reactions: {
        type: Array,
        default: {}
    }


});

module.exports = mongoose.model('Posts', PostSchema);
