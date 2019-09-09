
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