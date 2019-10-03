
'use strict';
var path = require('path');
var mongoose = require('mongoose');
var Post = mongoose.model('Posts');
var Reaction = mongoose.model('Reactions');
var upload = require('../../server').upload;


exports.list_all_posts = function(req, res) {

    Post.find(
        {parent: null},
        null,  // don't remove any fields from return data
        {sort: {post_date: -1}},
        function(err, posts) {
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

    Post.findById(post_id)
        .populate('reaction')
        .exec(
            function(err, post) {
                if (err)
                    return res.status(500).send({error: err});
                if (!post)
                    return res.status(400).send({error: "Post does not exist"});
                return res.status(200).send(post);
            }
        );
}


exports.create_post = function(req, res) {

    // file is placed into req.file from
    // multer middlewhere

    // check if file was actually saved
    if (!req.file) {
        return res.status(400).send({error: "Image is missing"});
    }

    // ASSUMPTION: username/author will always be here from auth handler

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

exports.get_reaction = function(req, res) {
    // requires post_id and username

    // convert string to object id
    try {
        var post_id = mongoose.Types.ObjectId(req.params.postid);
    }
    catch {
        return res.status(400).send({error: "Post ID is not valid"})
    }

    // check if username exists
    if (!req.body.username) {
        return res.status(400).send({error: "Username not provided"})
    }

    // get post
    Post.findById(post_id, function(err, post) {
        if (err)
            return res.status(500).send({error: err});

        // get reaction
        Reaction.findById(post.reaction, function(err, reaction) {
            if (err)
                return res.status(500).send({error: err});

            if (!reaction)
                return res.status(500).send({error: "Reactions could not be found"});

            var reaction;
            if (reaction.r1.includes(req.body.username))
                reaction = "r1";
            else if (reaction.r2.includes(req.body.username))
                reaction = "r2";
            else if (reaction.r3.includes(req.body.username))
                reaction = "r3";
            else if (reaction.r4.includes(req.body.username))
                reaction = "r4";
            else if (reaction.r5.includes(req.body.username))
                reaction = "r5";
            else
                return res.status(404).send({message: "Reaction not found"});

            return res.status(200).send({reaction: reaction});
        });
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
    Post.findById(post_id, function(err, post) {

        // find reaction object
        Reaction.findById(post.reaction, function(err, reaction) {

            // check if user has already reacted to post
            if ((reaction.r1.includes(req.username)) ||
                (reaction.r2.includes(req.username)) ||
                (reaction.r3.includes(req.username)) ||
                (reaction.r4.includes(req.username)) ||
                (reaction.r5.includes(req.username))) {
                return res.status(409).send({error: "User has already reacted"});
            }

            // try apply reaction
            var valid = false;
            switch (req.body.reaction) {
                case "r1": {
                    reaction.r1.push(req.username);
                    valid = true;
                    break;
                }
                case "r2": {
                    reaction.r2.push(req.username);
                    valid = true;
                    break;
                }
                case "r3": {
                    reaction.r3.push(req.username);
                    valid = true;
                    break;
                }
                case "r4": {
                    reaction.r4.push(req.username);
                    valid = true;
                    break;
                }
                case "r5": {
                    reaction.r5.push(req.username);
                    valid = true;
                    break;
                }
            }

            // save reaction
            if (valid) {
                reaction.save(function(err) {
                    if (err)
                        return res.status(500).send({error: err});
                    return res.status(200).send({message: "Reaction was successful", reaction: req.body.reaction});
                });
            } else
                return res.status(400).send({error: "Reaction was invalid"});
        });

    });

}


var remove_from_array = function(array, element) {
    var index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
    }
}


exports.remove_reaction = function(req, res) {

    // convert string to object id
    try {
        var post_id = mongoose.Types.ObjectId(req.params.postid);
    }
    catch {
        return res.status(400).send({error: "Post ID is not valid"})
    }

    Post.findById(post_id, function(err, post) {

        if (err)
            return res.status(500).send({error: err});

        Reaction.findById(post.reaction, function(err, reaction) {
            if (err)
                return res.status(500).send({error: err});

            // remove from all reactions
            remove_from_array(reaction.r1, req.username);
            remove_from_array(reaction.r2, req.username);
            remove_from_array(reaction.r3, req.username);
            remove_from_array(reaction.r4, req.username);
            remove_from_array(reaction.r5, req.username);

            reaction.save(function(err) {
                if (err)
                    res.status(500).send({error: err});
                res.status(200).send({message: "Reaction successfuly removed"});
            });

        });

    });


}



