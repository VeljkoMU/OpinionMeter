const express= require("express");
const mongoose = require("mongoose");
const PostModel = require("../models/post-model.js");
const PostsModel = require("../models/post-model.js");

const postsRouter = express.Router();

postsRouter.get("/getPostsByTag", (req, res)=>{
	
	PostModel.find({ tag: req.query.tag},(error,data)=>{
		if(error){
			res.json(data);
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
        approvals:0,
        disapprovals:0,
        comments:[],
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

    // const post = await PostModel.findOne({user: user}).exec();
    const post = await PostModel.findById(id);

    const comment = ({
        user: user,
        commentText: commentText
    })

    post.comments.push(comment);

    await post.save(err => console.log(err));

    res.status(200).end();

});

postsRouter.post("/rate", async (req, res)=>{
    let id = req.body._id;
    let isPositive = req.body.isPositive;

    console.log(id);

    let post = await PostModel.findById(id);
    if(!post){
        res.status(404).end();
        return;
    }

    if(isPositive)
        post.approvals = post.approvals+1;
    else
        post.disapprovals = post.disapprovals+1;

    post.save();
    res.status(500).end();
});

postsRouter.delete("/deletePost", (req, res)=>{
    let id = req.query._id;

    PostModel.findByIdAndRemove(id, err =>{
        if(err)
            console.error("Post Delete Error");
    })

    res.status(200).end();
});

module.exports = postsRouter;