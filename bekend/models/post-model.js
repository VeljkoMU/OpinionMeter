const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    user: String,
    approvals: {
        male: Number,
        female: Number,
        other: Number,
        unemployed: Number,
        employed: Number,
        parttime: Number,
        entrepreneur: Number,
        littlenone: Number,
        highschool: Number,
        bachelors: Number,
        masters: Number,
        phd: Number,
        europe: Number,
        middlewast: Number,
        fareast: Number,
        namerica: Number,
        samerica: Number,
        africa: Number,
        overall: Number
    },
    disapprovals: {
        male: Number,
        female: Number,
        other: Number,
        unemployed: Number,
        employed: Number,
        parttime: Number,
        entrepreneur: Number,
        littlenone: Number,
        highschool: Number,
        bachelors: Number,
        masters: Number,
        phd: Number,
        europe: Number,
        middlewast: Number,
        fareast: Number,
        namerica: Number,
        samerica: Number,
        africa: Number,
        overall: Number
    },
    comments: [{
        user: String,
        commentText: String,
        upvoteCounter: Number,
        downvoteCounter: Number,
        votedOnBy: [{type: String}]
    }],
    votedOnBy: [{type: String}],
    text: String,
    link: String,
    tag: String
}, {collection: "posts", strict: false});

PostSchema.index({user: 1}, {unique: false});
PostSchema.index({tag: 1}, {unique: false});

PostSchema.virtual("overallApprovals", ()=>{
    return PostSchema.approvals;
});


const PostModel = mongoose.model("PostModel", PostSchema);

module.exports = PostModel;