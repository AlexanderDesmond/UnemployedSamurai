
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CashSchema = new Schema( {
    cash: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Cash', CashSchema);