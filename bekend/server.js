const express = require("express");
const mongoose= require("mongoose");
const PostModel = require("./models/post-model.js");
const userRouter = require("./routers/user-router.js");
const postsRouter = require("./routers/posts-router.js");
const cors = require("cors");


const app = express();

mongoose.connect("mongodb://localhost/bazeproj3", ()=>"Connected to the database successfuly.");

app.use(express.json());

app.get("/", (req, res)=> res.send("Working!").end());

app.use(cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));


app.use("/userdata",userRouter);
app.use("/", postsRouter);


app.listen(5500);