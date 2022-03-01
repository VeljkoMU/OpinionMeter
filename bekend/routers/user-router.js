const express= require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/user-model.js");
const md5 = require("md5");
const PostModel = require("../models/post-model.js");

const userRouter = express.Router();

userRouter.post("/register", (req, res)=>{

    let username = req.body.username;
    let password = md5(req.body.password);

    UserModel.find({username: username}, (err, docs)=>{
        console.log(docs);
        if(docs.length!=0){
            res.status(403).end();
            return;
        }

        UserModel.create({
            username: username,
            password: password,
            gender: req.body.gender,
            education: req.body.edu,
            employment: req.body.emp,
            region: req.body.region
        }).then(()=>res.status(200).end())
        .catch((err)=>{
            console.log(err);
            res.status(500).end();
        })
    });
});

userRouter.post("/login", (req, res)=>{
    let username = req.body.username;
    let password = md5(req.body.password);

    UserModel.findOne({username: username}, (err, doc)=>{
        console.log(doc);
        if(!doc){
            res.status(404).end();
            return;
        }

        if(doc.password==password){
            res.status(200).end();
            return;
        }
        res.status(405).end();
    });
});

userRouter.delete("/delete", async (req, res)=>{
    let username = req.body.username;

    PostModel.deleteMany({user: username}, (err)=>{
        if(err){
            console.log(err);
            res.status(500).end();
            return;
        }

        UserModel.deleteOne({username: username}, (err)=>{
            if(err){
                console.log(err);
                res.status(500).end();
                return;
            }

            res.status(200).end();
        });
    });
});

module.exports = userRouter;