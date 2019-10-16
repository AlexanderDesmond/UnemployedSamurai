
'use strict';
var path = require('path');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var Post = mongoose.model('Posts');
var Reaction = mongoose.model('Reactions');
var User = mongoose.model('Users');
var upload = require('../../server').upload;


// return a list of posts, paginated
// requires the page number to be sent in the request
// as a param
exports.list_all_posts = function(req, res) {
    Post.paginate(
        {parent: null},
        {
            sort: {post_date: -1}, // decending
            page: req.params.page,
            limit: 10,
        },
        function(err, results) {
            if (err)
                return res.status(500).send({error: err});
            return res.status(200).send(results);
        }
    );
};

// return a list of posts based on number of reactions
// requires the page number to be sent in the request
exports.list_all_posts_trending = function(req, res) {
    Post.paginate(
        {parent: null},
        {
            sort: {reaction_count: -1}, // decending
            page: req.params.page,
            limit: 10,
        },
        function(err, results) {
            if (err)
                return res.status(500).send({error: err});
            return res.status(200).send(results);
        }
    );
}

// returns all posts for a specifc user
// username must be sent as param in url request
exports.list_posts_for_user = function(req, res) {
    try {
        Post.find( {author: req.params.username},
            function(err, result) {
                if (err)
                    res.status(500).send(err);

                res.status(200).send(result);
            });

    } catch (TypeError) {
        res.status(400).send({error: "username not found"});
    }
}


// return data for a specific post
// post id must be sent through param in link

// returns post data, including populated
// reaction field data.
// To get each comment, must use this function to
// retrieve it using the commentid (postid).
exports.get_post = function(req, res) {
    if (!req.params.postid)
        return res.status(400).send({error: "Missing post id"});

    // try convert string id to object id
    try {
        var post_id = mongoose.Types.ObjectId(req.params.postid);
    }
    catch {
        return res.status(400).send({error: "Post id is incorrect"})
    }

    Post.findById(post_id)
        .populate('reaction') // add reaction data from reactionid
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

    // get public location from multer-s3 OR file path from multer disk storage
    var image_path = req.file.location || req.file.path;

    Post.create(
        {
            author:  req.username,
            image_path: image_path // parent is null to mark as 'top' level post
        },
        function(err, post) {
            if (err)
                return res.status(500).send({error: err});

            // increment user post count
            User.findOne({username: post.author}, function(err, user) {
                user.post_count += 1;
                user.save(function(err) {}); // no error catch as this is an unimportant update
            });

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

    var image_path = req.file.location || req.file.path;

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
                parent: post._id // set the parent to mark as comment
            },
            function(err, comment) {
                if (err)
                    res.status(500).send({error: err});

                // save comment id to post
                post.comments.push(comment._id);
                post.save(function(err) {
                    if (err)
                        return res.status(500).send({error: err});

                    // increment user post count
                    User.findOne({username: comment.author}, function(err, user) {
                        user.post_count += 1;
                        user.save(function(err) {});
                    });

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

        if (!post)
            return res.status(500).send({error: err});

        // get reaction
        Reaction.findById(post.reaction, function(err, reaction) {
            if (err)
                return res.status(500).send({error: err});

            if (!reaction)
                return res.status(500).send({error: "Reactions could not be found"});

            // check under which reaction type array the current username
            // is stored
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
                reaction = "";

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

                    post.reaction_count += 1;
                    post.save(function(err) {
                        if (err)
                            return res.status(500).send({error: err});

                        return res.status(200).send({message: "Reaction was successful", reaction: req.body.reaction});
                    });
                });
            } else
                return res.status(400).send({error: "Reaction was invalid"});
        });

    });

}

// helper function to remove a single element
// from an array
// Reference: https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
var remove_from_array = function(array, element) {
    var index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
        return true;
    }
    return false;
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

            // remove current username from all reaction arrays
            let removed = false;
            let reaction_lists = [
                reaction.r1, reaction.r2, reaction.r3,
                reaction.r4, reaction.r5
            ];
            for (let i=0; i<reaction_lists.length; i++) {
                if (remove_from_array(reaction_lists[i], req.username))
                    removed = true;
            }

            reaction.save(function(err) {
                if (err)
                    return res.status(500).send({error: err});

                if (removed) {
                    post.reaction_count -= 1;
                    post.save(function(err) {
                        if (err)
                            return res.status(500).send({error: err});
                        return res.status(200).send({message: "Reaction successfuly removed"});
                    });
                }
                else
                    return res.status(200).send({message: "No Reaction to remove"});
            });

        });

    });

}

exports.delete_post = function(req, res) {

    // convert string to object id
    try {
        var post_id = mongoose.Types.ObjectId(req.params.postid);
    }
    catch {
        return res.status(400).send({error: "Post ID is not valid"})
    }

    // get post
    Post.findById(post_id, function(err, post) {

        if (!post)
            return res.status(404).send({error: "Post could not be found"});

        // check if author is same as authenticated user
        if (post.author != req.username)
            return res.status(403).send({error: "You are not authorised to delete this post"});

        // multiple middlewares are called in PostModel.js
        // to remove the post and children posts/comments
        post.remove(function(err) {
            if (err)
                return res.status(500).send({error: err});

            return res.status(200).send({message: "Post deleted successfully"});
        });

    });

}
