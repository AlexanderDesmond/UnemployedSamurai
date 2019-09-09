
'use strict';
module.exports = function(app) {
    var users = require('../controllers/UsersController');
    var posts = require('../controllers/PostsController');

    // user routes
    app.route('/users')
        .get(users.list_all_users)
        .post(users.create_user);

    app.route('/users/:username')
        .get(users.get_user)
        .put(users.update_user)
        .delete(users.delete_user);


    app.route('/login')
        .post(users.login_user);



    // post routes
    app.route('/post')
        .get(posts.list_all_posts)
        .post(posts.create_post);

};


