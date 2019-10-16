
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

    // used to send back a new token if the old one
    // is still active in order to extend login expiration
    app.route('/refreshtoken')
        .get(auth.verifyToken, users.refresh_token); // auth required

    // helper function
    app.route('/unique_username')
        .post(users.is_username_unique);


    // multiple posts

    // return most recent posts
    app.route('/posts/all/:page')
        .get(posts.list_all_posts)

    // return posts order by reaction
    // count
    app.route('/posts/trending/:page')
        .get(posts.list_all_posts_trending)

    app.route('/posts/:username')
        .get(posts.list_posts_for_user);

    // single post
    app.route('/post/new')
        .post(auth.verifyToken, upload.single('postImage'), posts.create_post); // auth required

    // add comment to post
    app.route('/post/comment/:postid')
        .post(auth.verifyToken, upload.single('postImage'), posts.create_comment); // auth required

    // add/update reaction to post/comment
    app.route('/post/react/:postid')
        .post(auth.verifyToken, posts.add_reaction) // auth required
        .delete(auth.verifyToken, posts.remove_reaction); // auth required

    // get the current reaction on a specific
    // post for the provided username in the body
    app.route('/post/react/get/:postid')
        .post(posts.get_reaction);


    // used to get all data about a single post
    // or a comment (comments are also Post objects)
    app.route('/post/:postid')
        .get(posts.get_post)
        .delete(auth.verifyToken, posts.delete_post); // auth required

};


