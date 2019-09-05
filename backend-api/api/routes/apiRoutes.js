
'use strict';
module.exports = function(app) {
    var users = require('../controllers/apiController');
    var cash = require('../controllers/cashController');

    // routes
    app.route('/users')
        .get(users.list_all_users)
        .post(users.create_user);

    app.route('/users/:username')
        .get(users.get_user)
        .put(users.update_user)
        .delete(users.delete_user);

    
    app.route('/login')
        .post(users.login_user);


    // --- cash stuff
    app.route('/cash')
        .get(cash.get_cash)
        .post(cash.put_cash);

};


