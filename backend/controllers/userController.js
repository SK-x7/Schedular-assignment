const { db,admin } = require("../firebaseConnection");

exports.getAllUsers=async (req,res,next)=>{
    const users=await db.collection("Users").get();
    const usersList=users.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
    }))
    console.log(users);
    return res.status(200).json({
        status:"success",
        message:"Users found successfully",
        usersList
    });
}

exports.checkUserInDb=async (req,res,next)=>{
  console.log(req.body)
  try {
  const users=await db.collection("Users").where("clerkUserId","==",req.body.userId).get();
  console.log(users.docs,"======================================================================");
  
  
  
  
  if(users.docs.length===1){
      const user =users.docs[0];
      const userData=await user.data();
      const id = user.id;
      
      console.log("User data:", userData,id);
      
      return res.status(200).json({
        status: "success",
        message: "User found",
        userExists: true,
        userData: { ...userData, id },
      });
  }else if(users.docs.length===0){
      
    console.log("No user found with this ID");
    return res.status(200).json({
      status: "fail",
      message: "User not found",
      userExists: false,
    });
  }else if(users.docs.length>1){
    console.error("Error: Multiple users found with the same clerkUserId");
    return res.status(500).json({
      status: "error",
      message: "Multiple users found with the same clerkUserId. Please check data consistency.",
      userExists: false,
    });
  }
  }catch (error) {
    console.log(error);
      return res.status(500).json({status:"fail",message:"error checking user"}) 
      // throw new Error(error);
    }
}


exports.createUser = async (req,res,next)=>{
    console.log(req.body)
    const userData=req.body.userData;
    try {
        
    
    const userRef=await db.collection("Users").add({
        ...userData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    
    console.log(userRef);
    if (userRef) {
        // Document found, retrieve data
        const user=(await (await userRef).get()).data();
    
        return res.status(200).json({status:"success",message:"User found",user});
      } else {
        // Document does not exist
        console.log("No user found with this ID");
        return res.status(404).json({status:"fail",message:"Error creating user"});
      }
      
      
    } catch (error) {
        console.log("🔴")
        console.log(error);
        return res.status(404).json({status:"fail",message:"Error creating user"});
    }
}
