
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema( {
    author: {
        type: String,
        required: true
    },
    image_path: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
        required: true
    },
    post_date: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: Array,
        default: {}
    }
});

module.exports = mongoose.model('Comments', CommentSchema);
