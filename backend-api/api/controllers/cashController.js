
'use strict';
var mongoose = require('mongoose'),
    Cash = mongoose.model('Cash');


exports.get_cash = function(req, res) {
    Cash.find( {}, function(err, result) {
        if (err)
            res.send(err);
        else {
            console.log(result);
            res.json(result[0]);
        }
    });
};

exports.add_cash = function(req, res) {
    Cash.find( {}, function(err, result) {
        
        // create new
        if (!result.length) {
            var new_value = new Cash(req.body);
            new_value.save( function(err, cash) {
                if (err)
                    res.send(err);
                res.json(cash);
            });
        }

        // add to previous value
        else  {
            result[0].cash += parseInt(req.body.cash);
            result[0].save( function(err, cash) {
                if (err)
                    res.send(err);
                res.json(cash);
            });
        }
    });
};


// exports.list_all_users = function(req, res) {
//     User.find({}, function(err, user) {
//         if (err)
//             res.send(err);
//         res.json(user);
//     });
// };
