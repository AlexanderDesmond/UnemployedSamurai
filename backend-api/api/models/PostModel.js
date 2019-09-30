
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema( {

    author: { // username
        type: String,
        required: true
    },
    image_path: {
        type: String,
        required: true
    },
    post_date: {
        type: Date,
        default: Date.now
    },
    parent: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Posts',
        default: null
    },
    children: [{
        type: Array,
        default: []
    }],
    reactions: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Reactions'
    }

});

module.exports = mongoose.model('Posts', PostSchema);
