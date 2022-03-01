const express = require("express");
const mongoose= require("mongoose");
const PostModel = require("./models/post-model.js");
const userRouter = require("./routers/user-router.js");
const postsRouter = require("./routers/posts-router.js");
const cors = require("cors");
const logger = require("./logger.js");


const app = express();

const port = 5500;
const connString = "mongodb://localhost/opinionmeterappdb";

mongoose.connect(connString, ()=>console.log("Connected to the database successfuly."));

app.use(express.json());

app.get("/", (req, res)=> res.send("Working!").end());

app.use(cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

app.use(logger);


app.use("/userdata",userRouter);
app.use("/", postsRouter);


app.listen(port, ()=>console.log("Server listening on " + port));