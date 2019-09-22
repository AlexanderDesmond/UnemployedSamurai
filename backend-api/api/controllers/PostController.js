
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

    // check if file was actually saved
    if (!req.file) {
        return res.status(400).send({error: "Image is missing"});
    }

    // ASSUMPTION: username will always be here from auth handler
    // create new post with filename stored
    Post.create(
        {
            author:  req.username,
            image_path: req.file.filename
        },
        function(err, post) {
            if (err)
                return res.status(500).send({error: err});

            return res.status(200).send({success: true, post: post});
        }
    );
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