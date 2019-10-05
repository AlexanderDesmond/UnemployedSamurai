
'use strict';
module.exports = function(app) {
    var users = require('../controllers/UserController');
    var posts = require('../controllers/PostController');
    var auth  = require('../controllers/AuthController');
    var upload = require('../../server').upload;

    // user
    app.route('/users')
        .get(users.get_user_leaderboard)
        .post(users.create_user);

    app.route('/users/:username')
        .get(users.get_user)
        .put(users.update_user) // auth required
        .delete(users.delete_user); // auth required

    // login
    app.route('/login')
        .post(users.login_user);

    app.route('/refreshtoken')
        .get(auth.verifyToken, users.refresh_token); // auth required

    // helper function
    app.route('/unique_username')
        .post(users.is_username_unique);


    // multiple posts
    app.route('/posts/all')
        .get(posts.list_all_posts)

    app.route('/posts/trending')
        .get(posts.list_all_posts_trending) // TODO sort by trending

    app.route('/posts/:username')
        .get(posts.list_posts_for_user);

    // single post
    app.route('/post/new')
        .post(auth.verifyToken, upload.single('postImage'), posts.create_post); // auth required

    app.route('/post/comment/:postid')
        .post(auth.verifyToken, upload.single('postImage'), posts.create_comment); // auth required

    app.route('/post/react/:postid')
        .post(auth.verifyToken, posts.add_reaction) // auth required
        .delete(auth.verifyToken, posts.remove_reaction); // auth required

    app.route('/post/react/get/:postid')
        .post(posts.get_reaction);

    app.route('/post/:postid')
        .get(posts.get_post);

};


