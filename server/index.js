import express from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/serverDB").then(()=>{"The mongo Server is now Connected!"});



const app = express();

const port = 3000;

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.listen(port, ()=>{

    console.log("Server running on port 3000");
});

app.get("/", (req,res)=>{

    res.send("Hello im the render function yo!");


});

app.get("/views", (req,res)=>{

    res.render("home", {title : "Home_page"});
});

