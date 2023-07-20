const PostModel = require("../models/post-model.js");
const redisClient = require("../config/redis-client.js")

const RATING_ENGAGEMENT_POINTS = 1;
const COMMENT_ENGAGEMENT_POINTS = 5;
const MOST_ENGAGED_POSTS_LIMIT = 5;
const POST_RESULT_PAGE_LIMIT = 5;

class PostController {

    constructor() {

    }

    getPostsByTag(tag, pageNum, onSuccess, onError) {
        redisClient.lrange(`${tag}:${pageNum}`, 0, -1, (err, cdata)=>{

        if(err || cdata.length === 0) {
        PostModel.paginate({tag: tag}, {page: pageNum, limit: POST_RESULT_PAGE_LIMIT, sort: {createdAt: -1}},(error, data)=>{
            if(error){
                onError();
            }
            else{
                redisClient.lpush(`${tag}:${pageNum}`, JSON.stringify(data));
                redisClient.expire(req.query.tag, 60 * 2);

                onSuccess({
                    docs: data.docs,
                    currentPage: data.page,
                    hasNextPage: data.page != data.totalPages,
                    hasPrevPage: data.page != 1
                });
            }
        });
    }
    else {
        const cdataParsed = JSON.parse(cdata);
        onSuccess({
            docs: cdataParsed.docs,
            currentPage: cdataParsed.page,
            hasNextPage: cdataParsed.page != cdataParsed.totalPages,
            hasPrevPage: cdataParsed.page != 1
        });
    }
    });
    }

    getPostsByUser(username, onSuccess, onError) {
        PostModel.find({ user: username},(error,data)=>{
            console.log(username)
            if(error){
                onError();
            }else{
                console.log(data)
                onSuccess(data);
            }
        })
    }

    async getMostEngagedWithPosts(onSuccess, onError) {
        try {
        const posts = await PostModel.find({}).sort('-interactionNum').limit(MOST_ENGAGED_POSTS_LIMIT)
        if(!posts || posts.length === 0) {
            onError(404);
        }
        else {
            onSuccess(posts)
        }
        }
        catch(err) {
            onError(500)
        }
    }

    createPost(post, onSuccess, onError) {
        PostModel.create({
            user: post.user,
            approvals:{
                "male": 0,
                "female": 0,
                "other": 0,
                "unemployed": 0,
                "employed": 0,
                "entrepreneur": 0,
                "parttime": 0,
                "littlenone": 0,
                "highschool": 0,
                "bachelors": 0,
                "masters": 0,
                "phd": 0,
                "europe": 0,
                "middleeast": 0,
                "eastasia": 0,
                "namerica": 0,
                "samerica":0,
                "africa": 0,
                "overall": 0
            },
            disapprovals: {
                    "male": 0,
                    "female": 0,
                    "other": 0,
                    "unemployed": 0,
                    "employed": 0,
                    "parttime": 0,
                    "entrepreneur": 0,
                    "littlenone": 0,
                    "highschool": 0,
                    "bachelors": 0,
                    "masters": 0,
                    "phd": 0,
                    "europe": 0,
                    "middleeast": 0,
                    "eastasia": 0,
                    "namerica": 0,
                    "samerica":0,
                    "africa": 0,
                    "overall": 0
            },
            comments:[],
            votedOnBy: [],
            text: post.text,
            link: post.link,
            interactionNum: 0,
            tag: post.tag,
            createdAt: Date.now()
        }, (err) => {
            if(err){
                onError()
            }
            else {
                onSuccess()
            }
        })
    }

    async addComment(username, postId, commentText, onSuccess, onError) {
        const post = await PostModel.findById(postId)
        if(!post) {
            onError();
            return;
        }

        const comment = {
        user: username,
        commentText: commentText,
        upvoteCounter: 0,
        downvoteCounter: 0,
        votedOnBy: []
        }

        post.comments.push(comment);
        post.interactionNum = post.interactionNum + RATING_ENGAGEMENT_POINTS;
        await post.save()
        onSuccess()
    }

    async ratePost(postId, user, isPositive, onSuccess, onError) {
        const post = await PostModel.findById(postId);

        if(!post) {
            onError(404);
            return;
        }
        if(post.votedOnBy.find((name) => name === user.username)) {
            onError(403);
            return;
        }

        try {
            await this.rateByUserInfo(post, user, isPositive)
            onSuccess()
        }
        catch(err) {
            onError(500)
        }

    }

    
async rateByUserInfo(post, user, isPositive){
    if(isPositive){
        post.approvals[user.gender]= post.approvals[user.gender] + 1;
        post.approvals[user.education] = post.approvals[user.education] + 1;
        post.approvals[user.region] = post.approvals[user.region] + 1;
        post.approvals[user.employment] = post.approvals[user.employment] + 1;
        post.approvals.overall = post.approvals.overall + 1;
    }
    else{
        post.disapprovals[user.gender]= post.disapprovals[user.gender] + 1;
        post.disapprovals[user.education] = post.disapprovals[user.education] + 1;
        post.disapprovals[user.region] = post.disapprovals[user.region] + 1;
        post.disapprovals[user.employment] = post.disapprovals[user.employment] + 1;
        post.disapprovals.overall = post.disapprovals.overall + 1;
    }

    console.log(post)
    post.interactionNum = post.interactionNum + COMMENT_ENGAGEMENT_POINTS;
    post.votedOnBy.push(user.username);

    post.save();
}

deletePost(postId, username, onSuccess, onError) {
    PostModel.findById(postId, (err, data) => {
        if(err) {
            onError(500);
            return;
        }

        if(data.user != username) {
            onError(405);
            return;
        }

        PostModel.findByIdAndDelete(postId, (err) => {
            if(err) {
                onError(500);
                return;
            }

            onSuccess();
        })
    });
}

deleteAllPostsByUser(username, onSuccess, onError) {
    PostModel.deleteMany({user: username}, (err) => {
        if(err) {
            onError(500);
            return;
        }

        onSuccess();
    })
}
}

module.exports = PostController;