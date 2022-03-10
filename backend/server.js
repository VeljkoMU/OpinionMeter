const express = require("express");
const mongoose= require("mongoose");
const PostModel = require("./models/post-model.js");
const userRouter = require("./routers/user-router.js");
const postsRouter = require("./routers/posts-router.js");
const cors = require("cors");
const logger = require("./logger.js");
const session = require("express-session")
const redisConnect = require("connect-redis");
const redisClient = require("./redis-client.js");


const app = express();

const redisSessionStore = redisConnect(session);

const port = 5500;
const connString = "mongodb://localhost/opinionmeterappdb";

mongoose.connect(connString, ()=>console.log("Connected to the database successfuly."));

app.use(express.json());

app.use(session({
    secret: "shhh",
    name: "session",
    store: new redisSessionStore({client: redisClient}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false,
        sameSite: false
    }
}));

app.get("/", (req, res)=> res.send("Working!").end());

app.use(cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));

app.use(logger);


app.use("/userdata",userRouter);
app.use("/", postsRouter);


app.listen(port, ()=>console.log("Server listening on " + port));