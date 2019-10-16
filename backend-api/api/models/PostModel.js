
'use strict';
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;
var Reaction = mongoose.model('Reactions');
var User = mongoose.model('Users');

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


// ---- MIDDLEWARE FUNCTIONS FOR SAVING/DELETING POSTS ----

// called AFTER a post is saved to
// create and link a 'reaction' to it
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


// called BEFORE a post is deleted to
// remove its child posts (comments) recursively
// it also removes the post_id's from the parent
// comments to remove all traces of it
PostSchema.pre("remove", function(next) {
    // remove reaction
    Reaction.deleteOne({"_id": mongoose.Types.ObjectId(this.reaction)}, function(err) {});

    // delete comment id from parent comments array
    if (this.parent != null) {

        // the id's are being stored as 'this' does not correctly reference the current obj
        // in the callback functions
        let parentid = this.parent;
        let myid = this._id;
        mongoose.model('Posts').findById(mongoose.Types.ObjectId(parentid), function(err, post) {
            if (!post || err)
                return;
            let index = post.comments.indexOf(myid);
            if (index > -1) {
                post.comments.splice(index, 1);
                post.save(function(err) {});
            }
        });
    }

    // remove child comments (causes recusive delete
    // as 'comments' are also post objects being 'deleted')
    mongoose.model('Posts').find(
        {parent: mongoose.Types.ObjectId(this._id)},
        function(err, posts) {
            if (err)
                return;
            for (let i=0; i<posts.length; i++)
                posts[i].remove(function(err) {});
        }
    );

    next();

});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Posts', PostSchema);
