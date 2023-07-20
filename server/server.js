const express = require("express");
const mongoose= require("mongoose");
const PostModel = require("./models/post-model.js");
const userRouter = require("./routers/user-router.js");
const postsRouter = require("./routers/posts-router.js");
const cors = require("cors");
const session = require("express-session")
const authorize = require("./middleware/authorization.js");
const initMongoDBConnection = require("./config/mongo-database.js");
const redisConnect = require("connect-redis");
const redisClient = require("./config/redis-client.js")

const app = express()
const path = require('path');
const mime = require('mime');
const redisSessionStore = redisConnect(session);

app.use(express.json());
const port = process.env.PORT || 5500;
(async function() {
    app.use(express.static(path.join(__dirname, 'dist/opinion-meter'),{
        setHeaders: (res, filePath) => {
          res.setHeader('Content-Type', mime.getType(filePath))
        }}));
    await initMongoDBConnection()
    app.use(session({
    secret: "X",
    name: "X",
    store: new redisSessionStore({client: redisClient}),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));
app.get(/^\/(main)?$/, (req, res)=> {
    res.sendFile(path.join(__dirname, 'dist/opinion-meter', 'index.html'));
});

app.use(cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));

app.use("/userdata",userRouter);
app.use("/posts", authorize, postsRouter);


app.listen(port, ()=>console.log("Server listening on " + port));
}
).call()

