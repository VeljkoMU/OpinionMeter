const express= require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/user-model.js");
const md5 = require("md5");

const userRouter = express.Router();

userRouter.post("/register", (req, res)=>{
    // ovo radi veki

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
            password: password
        }).then(()=>res.status(200).end())
        .catch(()=>res.status(500).end());
    });
});

userRouter.post("/login", (req, res)=>{
    //ovo isto radi veki
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
        res.status(500).end();
    });
});

module.exports = userRouter;