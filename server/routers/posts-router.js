const { serialize } = require("bson");
const express= require("express");
const mongoose = require("mongoose");
const PostModel = require("../models/post-model.js");
const { findById } = require("../models/post-model.js");
const PostsModel = require("../models/post-model.js");
const UserModel = require("../models/user-model.js");
const redisClient = require("../redis-client.js");
const  PostController = require("../controllers/post-controller.js");
const authorize = require("../middleware/authorization.js");
const validation = require("../middleware/validation.js")
const  UserDataController = require("../controllers/user-data-controller.js");

const postsRouter = express.Router();

postsRouter.get("/getPostsByTag", validation.validateTag, (req, res)=>{
    
    let postController = new PostController();
    postController.getPostsByTag(req.query.tag, req.query.pageNum, 
        (posts) => {
            res.json(posts).status(201).end();
        },
        () => {
            res.status(500).end();
        })
});

postsRouter.get("/getPostsFromuser", validation.validateUsername, (req, res)=>{
    let postController = new PostController()

    postController.getPostsByUser(req.query.user, 
        (posts) => {
            res.json(posts).status(201).end()
        },
        () => {
            res.status(500).end()
        })
});

postsRouter.post("/addPost", authorize, validation.validatePost, async (req, res)=>{
    let postController = new PostController()

    postController.createPost({
        user: req.session.username,
        text: req.body.post,
        tag: req.body.tag,
        link: req.body.link
    },
    () => {
        res.status(200).end();
    },
    () => {
        res.status(500).end();
    })
});

postsRouter.post("/addComment", authorize, validation.validateComment, (req, res)=>{
    let postController = new PostController()

    postController.addComment(req.session.username, req.body._id, req.body.commentText, 
        () => {
            res.status(200).end(); 
        },
        () => {
            res.status(404).end()
        })
});

postsRouter.post("/rate", authorize, validation.validateRating,async (req, res)=>{
    let userController = new UserDataController()

    userController.getUser(req.session.username, 
    (user) => {
        let postController = new PostController()
        
        postController.ratePost(req.body._id, user, req.body.isPositive,
            () => {
                res.status(200).end()
            },
            (errCode) => {
                res.status(errCode).end()
            })
    },
    () => {
        res.status(500).end()
    })
});

postsRouter.get("/mostEngagedWith", (req, res) => {
    const postController = new PostController()

    postController.getMostEngagedWithPosts(
        (posts) => {
            res.json(posts).status(201).end()
        },
        (errCode) => {
            res.status(errCode).end();
        }
    )
});

postsRouter.delete("/deletePost", authorize, validation.validatePostId,(req, res)=>{
    const postsController = new PostController();

    postsController.deletePost(req.query._id, req.session.username,
        () => {
            res.status(200).end();
        },
        (errCode) => {
            res.status(errCode);
        })
});

module.exports = postsRouter;