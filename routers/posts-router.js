const express= require("express");
const mongoose = require("mongoose");
const PostsModel = require("../models/post-model.js");

const postsRouter = express.Router();

postsRouter.get("/getPostsByTag", (req, res)=>{
    // Ovo radi Tina
    // Imaces u query stringu tag=nesto
    //Za obe tvoej funkcije osim sto tereba da se vrate svi pdoaci defenisani u PostModel, ukljucujuci i niz komentara, treab da
    //Vratis i _id koji ti se vrati iz baze, cisto da napomenem da vodis racuna o tome
});

postsRouter.get("/getPostsFromuser", (req, res)=>{
    //Ovo radi Tina
    // Imaces u query stringu user = nesto
});

postsRouter.post("/addPost", ()=>{
    // Ovo radi Sara, ti narpavi da radi za bilo kog usera samo gledaj kako je definisano u modelu
    // A kasnije cemo da vidimo oko autorizacije sta cemo
});

postsRouter.post("/addComment", (req, res)=>{
    // U bodiju ces da imas pored user i commentText, to je za komentar sta treba
    // Imaces i _id od posta u koji dodajes taj komentar
    // Treba da nadjes nacin da dodas komentar u liostu komentara u post
    // Pogledaj server.js funkciju /test2, ja sam to tu probao ali nece tako
});

postsRouter.post("/rate", (req, res)=>{
    // Ovo radi Veki
});

postsRouter.delete("/deletePost", (req, res)=>{
    // Ovo radi sata, dobices u body _id posta koji treba da se brises
});

module.exports = postsRouter;