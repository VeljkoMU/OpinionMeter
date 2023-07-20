const express= require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/user-model.js");
const md5 = require("md5");
const PostModel = require("../models/post-model.js");
const authorize = require("../middleware/authorization.js");
const validation = require("../middleware/validation.js")
const  UserDataController  = require("../controllers/user-data-controller.js");
const  PostController  = require("../controllers/post-controller.js");

const userRouter = express.Router();

userRouter.post("/register", validation.validateRegistrationBody,async (req, res)=>{

    let username = req.body.username;
    let userDataController = new UserDataController()
    req.session.username = undefined;

    await userDataController.registerUser(req.body, 
    () => {
        req.session.username = username;
        res.status(200).end();
    }, 
    () => {
        res.status(500).end();
    },
    () => {
        res.status(403).end();
    })
});

userRouter.get("/confirmCredentials", authorize, (req, res) => {
    const username = req.session.username;
    if(!username) {
        res.status(404).end()
        return;
    }
    res.json({username: username}).status(200).end()
})

userRouter.post("/login", validation.validateLoginBody,(req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let userDataController = new UserDataController()

    userDataController.login(username, password,
        () => {
            req.session.username = username;
            res.status(200).end();
        },
        () => {
            res.status(405).end();
        },
        () => {
            res.status(404).end();
        })
});

userRouter.delete("/delete", async (req, res)=>{
    const postsController = new PostController()

    postsController.deleteAllPostsByUser(req.session.username,
        () => {
            const userController = new UserDataController()

            userController.deleteUser(req.session.username,
                () => {
                    res.status(200).end()
                },
                (errCode) => {
                    res.status(errCode).end()
                })
        },
        (errCode) => {
            res.status(errCode).end()
        })
});

userRouter.get("/getUserData", authorize, async (req, res) => {
    const userController = new UserDataController()

    userController.getUser(req.session.username, 
            (userData) => {
                const filtered = {...userData, password: ""};
                res.json(filtered).status(200).end();
            }, 
            () => {
                res.status(500).end();   
            })
});

userRouter.get("/logout", authorize, async (req, res) => {
    req.session.username = undefined;
    res.status(200).end();
    return;
});

module.exports = userRouter;