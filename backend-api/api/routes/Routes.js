
'use strict';
module.exports = function(app) {
    var users = require('../controllers/UserController');
    var posts = require('../controllers/PostController');

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
    app.route('/posts')
        .get(posts.list_all_posts)
        .post(posts.create_post);

    app.route('/posts/:username')
        .get(posts.list_posts_for_user);

};


