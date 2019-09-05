
'use strict';
module.exports = function(app) {
    var cash = require('../controllers/cashController');

    // --- cash stuff
    app.route('/get')
        .get(cash.get_cash)
        .post(cash.put_cash);

};


