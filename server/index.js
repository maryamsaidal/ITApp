import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Model/UserModel.js";
import bcrypt from "bcrypt";
import PostModel from "./Model/Posts.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const app= express();
app.use(express.json());
app.use(cors());
const connectionstring ="mongodb+srv://project1:admin123@postitcluster.3iyfb.mongodb.net/postITDb?retryWrites=true&w=majority&appName=PostITCluster";
mongoose.connect(connectionstring);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
// Create multer instance
const upload = multer({ storage: storage });

app.post("/registerUser",async(req,res)=>{
    try{
        const name =req.body.name;
        const email=req.body.email;
        const password=req.body.password;
        const hashedpassword =await bcrypt.hash(password,10);

        const user =new UserModel({
            name:name,
            email:email,
            password:hashedpassword,
        });
        await user.save();
        res.send({user:user,msg:"Added."});
    }catch(error){
        res.status(500).json({error:"An error occurred"});
    }
});
app.post("/login",async(req,res)=>{
   try{
    const {email,password}=req.body;
    const user =await UserModel.findOne({ email:email});
    if(!user){
        return res.status(500).json({ error: "User not found."});

    }
    console.log(user);
    const passwordMatch =await bcrypt.compare(password,user.password);
    if (!passwordMatch){
        return res.status(401).json({error:"Authentication failed"});
    }
    res.status(200).json({user,message: "Success"});
   }catch(err){
    res.status(500).json({error:err.message});
   }
})
app.post("/logout",async (req,res)=>{
    res.status(200).json({ message: "Logged out successfully"});
});
app.post("/savePost",async (req,res)=>{
    try{
        const postMsg=req.body.postMsg;
        const email=req.body.email;

        const post =new PostModel({
            postMsg:postMsg,
            email:email,
        });
        await post.save();
        res.send({post:post , msg:"Added."});
    }catch(error){
        res.status(500).json({error:"An error occurred"});
    }
});

app.get("/getPosts", async (req,res)=>{
    try{
        const posts =await PostModel.find({}).sort({ createdAt: -1});

        const countPost =await PostModel.countDocuments({});

        res.send({ posts:posts,count:countPost});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"An error occured"});
    }
});


app.put("/likePost/:postId/", async (req, res) => {
    const postId = req.params.postId; //Extract the ID of the post from the URL
    const userId = req.body.userId;
  
    try {
       
        const postToUpdate = await PostModel.findOne({ _id: postId });

    if (!postToUpdate) {
      return res.status(404).json({ msg: "Post not found." });
    }

    //Search the user Id from the array of users who liked the post.
    const userIndex = postToUpdate.likes.users.indexOf(userId);

    //indexOf method returns the index of the first occurrence of a specified value in an array.
    //If the value is not found, it returns -1.

    //This code will toogle from like to unlike
    if (userIndex !== -1) {
      // User has already liked the post, so unlike it
      const udpatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count": -1 }, // Decrement the like count $inc and $pull are update operators
          $pull: { "likes.users": userId }, // Remove userId from the users array
        },
        { new: true } // Return the modified document
      );

      res.json({ post: udpatedPost, msg: "Post unliked." });
    } else {
      // User hasn't liked the post, so like it
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
            $inc: { "likes.count": 1 }, // Increment the like count
            $addToSet: { "likes.users": userId }, // Add userId to the users array if not already present
          },
          { new: true } // Return the modified document
        );
  
        res.json({ post: updatedPost, msg: "Post liked." });
      }
  
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  
  app.put("/updateUserProfile/:email/", async (req, res) => {
    //Retrieve the value from the route
    const email = req.params.email;
    //Retrieve the values from the request body.
    const name = req.body.name;
    const password = req.body.password;
  
    try {
      // Search for the user that will be updated using the findOne method
      const userToUpdate = await UserModel.findOne({ email: email });
  
      // Check if the user was found
      if (!userToUpdate) {
        return res.status(404).json({ error: "User not found" });
      }
      userToUpdate.name = name;

      //if the user changed the password, change the password in the Db to the new hashed password
      if (password !== userToUpdate.password) {
        const hashedpassword = await bcrypt.hash(password, 10);
        userToUpdate.password = hashedpassword;
      } else {
        //if the user did not change the password
        userToUpdate.password = password;
      }
  
      // Save the updated user
      await userToUpdate.save(); // Make sure to save the changes
  
      // Return the updated user as a response
      res.send({ user: userToUpdate, msg: "Updated." });
  
    } catch (err) {
      // Handle errors, including database or validation issues
      res.status(500).json({ error: err.message }); // Send a more descriptive error message
    }
  });
  
    


app.listen(3001,()=>{
    console.log("you are connected");
});