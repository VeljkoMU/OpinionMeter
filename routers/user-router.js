const express= require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/user-model.js");

const userRouter = express.Router();

userRouter.post("/register", (req, res)=>{
    // ovo radi veki
});

userRouter.post("/login", (req, res)=>{
    //ovo isto radi veki
});