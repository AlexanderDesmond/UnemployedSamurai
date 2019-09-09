
'use strict';
var mongoose = require('mongoose'),
    Post = mongoose.model('Posts');


exports.list_all_posts = function(req, res) {

    Post.find({}, function(err, posts) {
        if (err)
            res.send(err);

        res.json(posts);
    });
};


exports.create_post = function(req, res) {

    var new_post = new Post(req.body);
    new_post.save( function(err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
}


exports.list_posts_for_user = function(req, res) {
    try {
        Post.find( {author: req.params.username},
            function(err, result) {
                if (err)
                    res.send(err);

                res.json(result);
            });

    } catch (TypeError) {
        res.send(400, {error: "username not found"});
    }
}