
'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReactionSchema = new Schema({

    parent: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Posts',
        required: true
    },

    // reaction types, contain list of usernames
    r1: {
        type: Array,
        default: []
    },
    r2: {
        type: Array,
        default: []
    },
    r3: {
        type: Array,
        default: []
    },
    r4: {
        type: Array,
        default: []
    },
    r5: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Reactions', ReactionSchema);
