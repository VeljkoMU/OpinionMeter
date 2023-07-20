const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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
        middleeast: Number,
        eastasia: Number,
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
        middleeast: Number,
        eastasia: Number,
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
    interactionNum: Number,
    tag: String,
    createdAt: Number
}, {collection: "posts", strict: false});

PostSchema.plugin(mongoosePaginate)

PostSchema.index({user: 1}, {unique: false});
PostSchema.index({tag: 1}, {unique: false});
PostSchema.index({interactionNum: 1}, {unique: false})

PostSchema.virtual("overallApprovals", ()=>{
    return PostSchema.approvals;
});

const PostModel = mongoose.model("PostModel", PostSchema);

module.exports = PostModel;