
'use strict';
var mongoose = require('mongoose');
var Post = mongoose.model('Posts');
var upload = require('../../server').upload;

exports.list_all_posts = function(req, res) {

    Post.find({}, function(err, posts) {
        if (err)
            res.send(err);

        res.json(posts);
    });
};


exports.create_post = function(req, res) {

    // file is placed into req.file from
    // multer middlewhere

    if (!req.file) {
        return res.status(400).send({error: "Image is missing"});
    }

    // var new_post = new Post(req.body);
    // // get author from AuthController after token verification
    // new_post.author = req.username;
    // new_post.save( function(err, post) {
    //     if (err)
    //         res.send(err);
    //     res.json(post);
    // });
    return res.status(200).send({success: true, filename: req.file.filename});
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