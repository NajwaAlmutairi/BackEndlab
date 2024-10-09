import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.json());

const port = 1819;

import Article from "./models/blog.js"

import dotenv from 'dotenv';

dotenv.config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.mongo_url
  );
  console.log("here");
}

app.get("/artical", (req, res) => {
  const artical = new Article({
    title: "my title",
    body: "this is my body",
  });
  artical
    .save()

    .then((result) => {
      res.send(result);
    });
});

app.post("/addArtical", (req, res) => {
  const artical = new Article({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    isEmployee: req.body.isEmployee,
  });
  artical
    .save()

    .then((result) => {
      res.send(result);
    });
});

app.get("/addArtical", (req, res) => {
  Article.find()
  .then((result) => {
    res.send(result);
  });

});

app.patch("/addArtical/:id",(req,res)=>{
  const {id} = req.params 
  Article.findByIdAndUpdate(id,req.body,{new: true,runValidators:true})
  .then((result) => {
    res.send(result);
  })
  .catch((err)=>{
    res.send("error",err);
  });
})

app.delete("/addArtical/:id",(req,res)=>{
  const {id} = req.params 
  Article.findByIdAndDelete(id)	
  .then((result) => {
    res.send(result);
  })
  .catch((err)=>{
    res.send("error",err);
  });
})


app.get("/addArtical/:id",(req,res)=>{
  const {id} = req.params 
  Article.findById(id)	
  .then((result) => {
    res.send(result);
  })
  .catch((err)=>{
    res.send("error",err);
  });
})

app.listen(port, () => {});
