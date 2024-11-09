const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const express = require('express');
let admin=require("firebase-admin");
let serviceAccount=require("./serviceAccountKey.json")
// const app = initializeApp();
const app=express();

app.use(express.json())

app.listen(4000,()=>console.log("app running on 4000"));
// initializeApp(app);
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})
const db=getFirestore();

console.log(db);


app.get("/",(req,res,next)=>{
    return res.status(200).json({status:"successs",message:"Everything fine here,app runnning successfully"});
})

app.get("/getAllUsers",async (req,res,next)=>{
    return;
})

app.post("/checkUserInDb",async (req,res,next)=>{
    console.log(req.body)
    
    const userRef=db.collection("Users").doc(req.body.userId);
    const userDoc = await userRef.get();
    
    if (userDoc.exists) {
        // Document found, retrieve data
        const userData = userDoc.data;
        
        console.log("User data:", userData);
        
        return res.status(400).json({status:"success",message:"User found",userData});
      } else {
        // Document does not exist
        console.log("No user found with this ID");
        return res.status(404).json({status:"fail",message:"User not found"});
      }
})




