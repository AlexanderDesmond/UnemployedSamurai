
'use strict';
module.exports = function(app) {
    var userList = require('../controllers/apiController');

    // routes
    app.route('/users')
        .get(userList.list_all_users)
        .post(userList.create_user);

    // app.route('/users/:userId)
    //     .get(userList.get_user)
    //     .put(userList.update_user)
    //     .delete(userList.remove_user);

    
};


