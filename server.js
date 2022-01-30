const express = require("express");
const mongoose= require("mongoose");
const PostModel = require("./models/post-model.js");
const userRouter = require("./routers/user-router.js");
const postsRouter = require("./routers/posts-router.js");


const app = express();

mongoose.connect("mongodb://localhost/bazeproj3", ()=>"Connected to the database successfuly.");

app.use(express.json());

app.get("/", (req, res)=> res.send("Working!").end());

app.get("/test1", (req, res)=>{
    console.log("Radim!");
    PostModel.create({
    user: "WekiTest",
    approvals: 55,
    disapprovals: 15,
    comments: [{
        user: "SaraTest",
        commentText: "Ovo je sranje post!"
    },
    {
        user: "TineTest",
        commentText: "nema cao za tebe!"
    }],
    text: "Cao svima!",
    link: "nesto",
    tag: "svasta"
    });
});

app.get("/test2", (req, res)=>{
    console.log("radim!");

    PostModel.updateMany({user: "WekiTest"}, {
        $push : { // ovo ne radu nemojte ovako da radite nzm sta mu je 
            comments :  {
                     "user": "Misko",
                     "commentText": "Treab platis struju!"
                   } //inserted data is the object to be inserted 
          }
    });
});

app.get("/test3", (req, res)=>{
    const m = PostModel.find({user: "WekiTest"}, (err, data)=>{
        console.log(data);
        console.log("..................." + data[0]._id);
    });
   // console.log(m);
});

app.use("/userdata",userRouter);
app.use("/", postsRouter);


app.listen(5500);