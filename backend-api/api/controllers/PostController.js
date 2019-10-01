
'use strict';
var path = require('path');
var mongoose = require('mongoose');
var Post = mongoose.model('Posts');
var Reaction = mongoose.model('Reactions');
var upload = require('../../server').upload;


exports.list_all_posts = function(req, res) {

    Post.find({}, function(err, posts) {
        if (err)
            res.send(err);

        res.json(posts);
    });
};


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


exports.get_post = function(req, res) {
    if (!req.params.postid)
        return res.status(400).send({error: "Missing post id"});

    try {
        var post_id = mongoose.Types.ObjectId(req.params.postid);
    }
    catch {
        return res.status(400).send({error: "Post id is incorrect"})
    }

    Post.findById(post_id, function(err, post) {
        if (err)
            return res.status(500).send({error: err});
        if (!post)
            return res.status(400).send({error: "Post does not exist"});
        return res.status(200).send(post);
    });
}


exports.create_post = function(req, res) {

    // file is placed into req.file from
    // multer middlewhere

    // check if file was actually saved
    if (!req.file) {
        return res.status(400).send({error: "Image is missing"});
    }

    // ASSUMPTION: username/author will always be here from auth handler

    // store filepath in 'test' environment
    // store public url path when image uploaded to aws
    if (process.env.NODE_ENV == "test")
        var image_path = path.resolve(req.file.path);
    else
        var image_path = req.file.location;

    Post.create(
        {
            author:  req.username,
            image_path: image_path
        },
        function(err, post) {
            if (err)
                return res.status(500).send({error: err});

            return res.status(200).send(post);
        }
    );
}


exports.create_comment = function(req, res) {

    /* required data
        - post_id
        - comment image
        - username
    */

    // check if image exists
    if (!req.file)
        return res.status(400).send({error: "Image is missing"});

    // convert string to object id
    try {
        var post_id = mongoose.Types.ObjectId(req.params.postid);
    }
    catch {
        return res.status(400).send({error: "Post ID is not valid"})
    }

    // path conversion during testing
    if (process.env.NODE_ENV == "test")
        var image_path = path.resolve(req.file.path);
    else
        var image_path = req.file.location;


    // check if post exists
    Post.findById(post_id, function(err, post) {
        if (err)
            return res.status(500).send({error: err});

        if (!post)
            return res.status(400).send({error: "Post does not exist"});

        // create new comment
        Post.create(
            {
                author: req.username,
                image_path: image_path,
                parent: post._id
            },
            function(err, comment) {
                if (err)
                    res.status(500).send({error: err});

                // save comment id to post
                post.comments.push(comment._id);
                post.save(function(err) {
                    if (err)
                        return res.status(500).send({error: err});
                    return res.status(200).send(comment);
                });

            }
        );

    });

}


exports.add_reaction = function(req, res) {

    // convert string to object id
    try {
        var post_id = mongoose.Types.ObjectId(req.params.postid);
    }
    catch {
        return res.status(400).send({error: "Post ID is not valid"})
    }

    // find post
    Post.findById(post_id, function() {

        // find reaction object

    });



}




