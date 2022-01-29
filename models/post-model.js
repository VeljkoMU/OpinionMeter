const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    user: String,
    approvals: Number,
    disapprovals: Number,
    comments: [{
        user: String,
        commentText: String
    }],
    text: String,
    link: String,
    tag: String
}, {collection: "posts"});

PostSchema.index({user: 1}, {unique: false});
PostSchema.index({tag: 1}, {unique: false});

const PostModel = mongoose.model("PostModel", PostSchema);

module.exports = PostModel;