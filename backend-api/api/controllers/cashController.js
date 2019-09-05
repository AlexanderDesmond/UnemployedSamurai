
'use strict';
var mongoose = require('mongoose'),
    Cash = mongoose.model('Cash');


exports.get_cash = function(req, res) {
    res.send(501);
};

exports.put_cash = function(req, res) {
    res.send(501);
};



// exports.list_all_users = function(req, res) {
//     User.find({}, function(err, user) {
//         if (err)
//             res.send(err);
//         res.json(user);
//     });
// };
