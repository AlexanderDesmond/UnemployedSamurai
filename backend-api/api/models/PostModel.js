
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Reaction = mongoose.model('Reactions');
var User = mongoose.model('Users');
// var Post = mongoose.model('Posts');

var PostSchema = new Schema( {

    author: { // username
        type: String,
        required: true
    },
    image_path: {
        type: String,
        required: true
    },
    post_date: {
        type: Date,
        default: Date.now
    },
    parent: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Posts',
        default: null
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Posts'
    }],
    reaction: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Reactions',
        default: null
    },
    reaction_count: {
        type: Number,
        default: 0
    }

});


PostSchema.post("save", function(post, next) {

    // create empty reaction object for every
    // new post
    if (post.reaction != null) {
        next();
    }
    else {
        Reaction.create(
            {parent: post._id},
            function(err, reaction) {
                next(err);
                post.reaction = reaction;
                post.save(function(err) {
                    next(err);
                });
            }
        );
    }
});


PostSchema.pre("remove", function(next) {
    // remove reaction
    Reaction.deleteOne({"_id": mongoose.Types.ObjectId(this.reaction)}, function(err) {});

    // remove comments
    mongoose.model('Posts').find(
        {parent: mongoose.Types.ObjectId(this._id)},
        function(err, posts) {
            for (let i=0; i<posts.length; i++)
                posts[i].remove(function(err) {});
        }
    );

    next();

});


module.exports = mongoose.model('Posts', PostSchema);
