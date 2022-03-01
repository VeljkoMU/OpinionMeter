const { serialize } = require("bson");
const express= require("express");
const mongoose = require("mongoose");
const PostModel = require("../models/post-model.js");
const { findById } = require("../models/post-model.js");
const PostsModel = require("../models/post-model.js");
const UserModel = require("../models/user-model.js");

const postsRouter = express.Router();

postsRouter.get("/getPostsByTag", (req, res)=>{
	
	PostModel.find({ tag: req.query.tag},(error,data)=>{
		if(error){
            console.log(error);
			res.status(500).end();
		}else{
			res.json(data);
		}
	})
});

postsRouter.get("/getPostsFromuser", (req, res)=>{
    PostModel.find({ user: req.query.user},(error,data)=>{
		if(error){
			res.status(500).end();
		}else{
			res.json(data);
		}
	})
});

postsRouter.post("/addPost", async (req, res)=>{

    let user = req.body.user;
    let postText = req.body.post;
    let tag = req.body.tag;
    let link = req.body.link;

    PostModel.create({
        user:user,
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
            "middlewast": 0,
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
                "entrepreneur": 0,
                "littlenone": 0,
                "highschool": 0,
                "bachelors": 0,
                "masters": 0,
                "phd": 0,
                "europe": 0,
                "middlewast": 0,
                "eastasia": 0,
                "namerica": 0,
                "samerica":0,
                "africa": 0,
                "overall": 0
        },
        comments:[],
        votedOnBy: [],
        text: postText,
        link: link,
        tag: tag
    })
    .then(()=> res.status(200).end())
    .catch(()=> res.status(500).end());
});

postsRouter.post("/addComment", async (req, res)=>{

    let id = req.body._id;
    let user = req.body.user;
    let commentText = req.body.commentText;

    const post = await PostModel.findById(id);

    const comment = ({
        user: user,
        commentText: commentText,
        upvoteCounter: 0,
        downvoteCounter: 0,
        votedOnBy: []
    })

    post.comments.push(comment);

    await post.save(err => console.log(err));

    res.status(200).end();

});

postsRouter.put("/rateComment", async (req, res)=>{
    let user = req.body.user;
    //Ovde ide provera da li je vec rejtovao

    let post = await PostModel.findById(req.body.postid);
    let comment = post.comments.find((el)=>el._id==req.body.commentid);

    if(comment.votedOnBy.find((el)=> el===user)!=undefined){
        res.status(405).end();
        return;
    }

    if(req.body.isPositive)
        comment.upvoteCounter = comment.upvoteCounter + 1;
    else
        comment.downvoteCounter = comment.downvoteCounter + 1;

    comment.votedOnBy.push(user);
    
    post.save();
    res.status(200).end();
});

postsRouter.post("/rate", async (req, res)=>{
    let id = req.body._id;
    let username = req.body.username;
    let isPositive = req.body.isPositive;

    console.log(id);

    let post = await PostModel.findById(id);
    if(!post){
        res.status(404).end();
        return;
    }
    let user = await UserModel.find({username: username});
    if(!user){
        res.status(404).end();
        return;
    }

    if(post.votedOnBy.find((el)=>el==username)!=undefined){
        res.status(405).end();
        return;
    }

    console.log(post);
    console.log(user);

    rateByUserInfo(post, user[0], isPositive);


    res.status(200).end();
});

postsRouter.delete("/deletePost", (req, res)=>{
    let id = req.query._id;

    PostModel.findByIdAndRemove(id, err =>{
        if(err)
            console.error("Post Delete Error");
    })

    res.status(200).end();
});


function rateByUserInfo(post, user, isPositive){
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

    console.log(post);

    post.votedOnBy.push(user.username);

    post.save();

}

module.exports = postsRouter;