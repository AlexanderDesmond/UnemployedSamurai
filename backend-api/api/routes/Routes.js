
'use strict';
module.exports = function(app) {
    var users = require('../controllers/UserController');
    var posts = require('../controllers/PostController');
    var auth  = require('../controllers/AuthController');
    var upload = require('../../server').upload;

    // user routes
    app.route('/users')
        .get(users.list_all_users)
        .post(users.create_user);

    app.route('/users/:username')
        .get(users.get_user)
        .put(users.update_user) // user auth required
        .delete(users.delete_user); // user auth required

    // login
    app.route('/login')
        .post(users.login_user);

    app.route('/refreshtoken')
        .get(auth.verifyToken, users.refresh_token);


    // post routes
    app.route('/posts')
        .get(posts.list_all_posts)
        .post(auth.verifyToken, upload.single('postImage'), posts.create_post); // user auth required


    app.route('/post/:postid')
        .get(posts.get_post);


    app.route('/posts/:username')
        .get(posts.list_posts_for_user);

    // helper functions
    app.route('/unique_username')
        .post(users.is_username_unique);

};


